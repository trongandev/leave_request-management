/**
 * Filter Logic Parser - Phân tích cú pháp công thức logic thành AST
 * Hỗ trợ các toán tử: ==, !=, <, >, <=, >=, LIKE, AND, OR, ()
 * Ví dụ: "totalDays <= 2 AND reason LIKE 'Bệnh'"
 */

// ============ Token Types ============
type TokenType = "IDENTIFIER" | "NUMBER" | "STRING" | "BOOLEAN" | "NULL" | "EQ" | "NE" | "LT" | "GT" | "LE" | "GE" | "LIKE" | "AND" | "OR" | "LPAREN" | "RPAREN" | "EOF";

interface Token {
    type: TokenType;
    value: any;
    position: number;
}

// ============ AST Node Types ============
interface ASTNode {
    type: string;
}

interface BinaryOpNode extends ASTNode {
    type: "BinaryOp";
    operator: string;
    left: ASTNode;
    right: ASTNode;
}

interface ComparisonNode extends ASTNode {
    type: "Comparison";
    operator: string;
    left: ASTNode;
    right: ASTNode;
}

interface IdentifierNode extends ASTNode {
    type: "Identifier";
    name: string;
}

interface LiteralNode extends ASTNode {
    type: "Literal";
    value: any;
}

type ParsedNode = BinaryOpNode | ComparisonNode | IdentifierNode | LiteralNode;

// ============ Lexer (Tokenizer) ============
class Lexer {
    private input: string;
    private position: number = 0;
    private tokens: Token[] = [];

    constructor(input: string) {
        this.input = input.trim();
    }

    private currentChar(): string {
        return this.input[this.position] || "";
    }

    private peekChar(offset: number = 1): string {
        return this.input[this.position + offset] || "";
    }

    private advance(): void {
        this.position++;
    }

    private skipWhitespace(): void {
        while (this.currentChar() === " " || this.currentChar() === "\t") {
            this.advance();
        }
    }

    private readIdentifier(): string {
        let identifier = "";
        while (/[a-zA-Z0-9_]/.test(this.currentChar())) {
            identifier += this.currentChar();
            this.advance();
        }
        return identifier;
    }

    private readNumber(): number {
        let number = "";
        while (/[0-9.]/.test(this.currentChar())) {
            number += this.currentChar();
            this.advance();
        }
        return parseFloat(number);
    }

    private readString(quote: string): string {
        this.advance(); // Skip opening quote
        let string = "";
        while (this.currentChar() !== quote && this.currentChar() !== "") {
            if (this.currentChar() === "\\") {
                this.advance();
                string += this.currentChar();
            } else {
                string += this.currentChar();
            }
            this.advance();
        }
        this.advance(); // Skip closing quote
        return string;
    }

    tokenize(): Token[] {
        while (this.position < this.input.length) {
            this.skipWhitespace();

            const char = this.currentChar();

            // End of input
            if (!char) break;

            // Parentheses
            if (char === "(") {
                this.tokens.push({ type: "LPAREN", value: "(", position: this.position });
                this.advance();
                continue;
            }

            if (char === ")") {
                this.tokens.push({ type: "RPAREN", value: ")", position: this.position });
                this.advance();
                continue;
            }

            // Comparison operators
            if (char === "=" && this.peekChar() === "=") {
                this.tokens.push({ type: "EQ", value: "==", position: this.position });
                this.advance();
                this.advance();
                continue;
            }

            if (char === "!" && this.peekChar() === "=") {
                this.tokens.push({ type: "NE", value: "!=", position: this.position });
                this.advance();
                this.advance();
                continue;
            }

            if (char === "<" && this.peekChar() === "=") {
                this.tokens.push({ type: "LE", value: "<=", position: this.position });
                this.advance();
                this.advance();
                continue;
            }

            if (char === ">" && this.peekChar() === "=") {
                this.tokens.push({ type: "GE", value: ">=", position: this.position });
                this.advance();
                this.advance();
                continue;
            }

            if (char === "<") {
                this.tokens.push({ type: "LT", value: "<", position: this.position });
                this.advance();
                continue;
            }

            if (char === ">") {
                this.tokens.push({ type: "GT", value: ">", position: this.position });
                this.advance();
                continue;
            }

            // Strings
            if (char === '"' || char === "'") {
                const string = this.readString(char);
                this.tokens.push({ type: "STRING", value: string, position: this.position });
                continue;
            }

            // Numbers
            if (/[0-9]/.test(char)) {
                const number = this.readNumber();
                this.tokens.push({ type: "NUMBER", value: number, position: this.position });
                continue;
            }

            // Identifiers and keywords
            if (/[a-zA-Z_]/.test(char)) {
                const identifier = this.readIdentifier();
                const upperCase = identifier.toUpperCase();

                if (upperCase === "TRUE") {
                    this.tokens.push({ type: "BOOLEAN", value: true, position: this.position });
                } else if (upperCase === "FALSE") {
                    this.tokens.push({ type: "BOOLEAN", value: false, position: this.position });
                } else if (upperCase === "NULL") {
                    this.tokens.push({ type: "NULL", value: null, position: this.position });
                } else if (upperCase === "AND") {
                    this.tokens.push({ type: "AND", value: "AND", position: this.position });
                } else if (upperCase === "OR") {
                    this.tokens.push({ type: "OR", value: "OR", position: this.position });
                } else if (upperCase === "LIKE") {
                    this.tokens.push({ type: "LIKE", value: "LIKE", position: this.position });
                } else {
                    this.tokens.push({ type: "IDENTIFIER", value: identifier, position: this.position });
                }
                continue;
            }

            throw new Error(`Unexpected character: ${char} at position ${this.position}`);
        }

        this.tokens.push({ type: "EOF", value: null, position: this.position });
        return this.tokens;
    }
}

// ============ Parser ============
class Parser {
    private tokens: Token[];
    private position: number = 0;

    constructor(tokens: Token[]) {
        this.tokens = tokens;
    }

    private currentToken(): Token {
        return this.tokens[this.position] || { type: "EOF", value: null, position: 0 };
    }

    // peekToken kept for future use
    // private peekToken(offset: number = 1): Token { ... }

    private advance(): void {
        this.position++;
    }

    private expect(type: TokenType): Token {
        const token = this.currentToken();
        if (token.type !== type) {
            throw new Error(`Expected token type ${type}, got ${token.type}`);
        }
        this.advance();
        return token;
    }

    parse(): ParsedNode {
        const ast = this.parseOrExpression();
        this.expect("EOF");
        return ast;
    }

    private parseOrExpression(): ParsedNode {
        let left = this.parseAndExpression();

        while (this.currentToken().type === "OR") {
            const operator = this.currentToken().value;
            this.advance();
            const right = this.parseAndExpression();
            left = {
                type: "BinaryOp",
                operator,
                left,
                right,
            } as BinaryOpNode;
        }

        return left;
    }

    private parseAndExpression(): ParsedNode {
        let left = this.parseComparison();

        while (this.currentToken().type === "AND") {
            const operator = this.currentToken().value;
            this.advance();
            const right = this.parseComparison();
            left = {
                type: "BinaryOp",
                operator,
                left,
                right,
            } as BinaryOpNode;
        }

        return left;
    }

    private parseComparison(): ParsedNode {
        let left = this.parsePrimary();

        const comparisonOps = ["EQ", "NE", "LT", "GT", "LE", "GE", "LIKE"];
        if (comparisonOps.includes(this.currentToken().type)) {
            const operator = this.currentToken().value;
            this.advance();
            const right = this.parsePrimary();
            return {
                type: "Comparison",
                operator,
                left,
                right,
            } as ComparisonNode;
        }

        return left;
    }

    private parsePrimary(): ParsedNode {
        const token = this.currentToken();

        // Parenthesized expression
        if (token.type === "LPAREN") {
            this.advance();
            const expr = this.parseOrExpression();
            this.expect("RPAREN");
            return expr;
        }

        // Identifier
        if (token.type === "IDENTIFIER") {
            this.advance();
            return {
                type: "Identifier",
                name: token.value,
            } as IdentifierNode;
        }

        // Literal values
        if (token.type === "NUMBER") {
            this.advance();
            return {
                type: "Literal",
                value: token.value,
            } as LiteralNode;
        }

        if (token.type === "STRING") {
            this.advance();
            return {
                type: "Literal",
                value: token.value,
            } as LiteralNode;
        }

        if (token.type === "BOOLEAN") {
            this.advance();
            return {
                type: "Literal",
                value: token.value,
            } as LiteralNode;
        }

        if (token.type === "NULL") {
            this.advance();
            return {
                type: "Literal",
                value: null,
            } as LiteralNode;
        }

        throw new Error(`Unexpected token: ${token.type}`);
    }
}

// ============ Evaluator ============
class Evaluator {
    evaluate(node: ASTNode, context: Record<string, any>): any {
        if (node.type === "BinaryOp") {
            const binNode = node as BinaryOpNode;
            const left = this.evaluate(binNode.left, context);
            const right = this.evaluate(binNode.right, context);

            if (binNode.operator === "AND") {
                return left && right;
            } else if (binNode.operator === "OR") {
                return left || right;
            }
        }

        if (node.type === "Comparison") {
            const compNode = node as ComparisonNode;
            const left = this.evaluate(compNode.left, context);
            const right = this.evaluate(compNode.right, context);

            switch (compNode.operator) {
                case "==":
                    return left == right;
                case "!=":
                    return left != right;
                case "<":
                    return left < right;
                case ">":
                    return left > right;
                case "<=":
                    return left <= right;
                case ">=":
                    return left >= right;
                case "LIKE":
                    // LIKE operator: case-insensitive substring match
                    return String(left).toLowerCase().includes(String(right).toLowerCase());
                default:
                    throw new Error(`Unknown operator: ${compNode.operator}`);
            }
        }

        if (node.type === "Identifier") {
            const idNode = node as IdentifierNode;
            if (!(idNode.name in context)) {
                throw new Error(`Undefined variable: ${idNode.name}`);
            }
            return context[idNode.name];
        }

        if (node.type === "Literal") {
            const litNode = node as LiteralNode;
            return litNode.value;
        }

        throw new Error(`Unknown node type: ${node.type}`);
    }
}

// ============ Public API ============
export interface FilterResult {
    matching: any[];
    notMatching: any[];
    error?: string;
}

export function parseAndFilterData(formula: string, data: any[], dataExtractor?: (item: any) => Record<string, any>): FilterResult {
    try {
        // Default extractor: uses item.requestId?.values
        // Note: totalDays và reason từ dữ liệu, hỗ trợ toán tử LIKE để tìm kiếm
        const defaultExtractor = (item: any) => ({
            ...item.requestId?.values,
            totalDays: item.requestId?.values?.totalDays || 0,
            reason: item.requestId?.values?.reason || "",
        });

        const extractor = dataExtractor || defaultExtractor;

        // Tokenize
        const lexer = new Lexer(formula);
        const tokens = lexer.tokenize();

        // Parse
        const parser = new Parser(tokens);
        const ast = parser.parse();

        // Evaluate
        const evaluator = new Evaluator();
        const matching: any[] = [];
        const notMatching: any[] = [];

        for (const item of data) {
            try {
                const context = extractor(item);
                const result = evaluator.evaluate(ast, context);

                if (result) {
                    matching.push(item);
                } else {
                    notMatching.push(item);
                }
            } catch (error) {
                // If evaluation fails for an item, put it in notMatching
                notMatching.push(item);
            }
        }

        return { matching, notMatching };
    } catch (error: any) {
        return {
            matching: [],
            notMatching: data,
            error: error.message,
        };
    }
}

// Helper function to get AST (useful for debugging)
export function getAST(formula: string): ParsedNode {
    const lexer = new Lexer(formula);
    const tokens = lexer.tokenize();
    const parser = new Parser(tokens);
    return parser.parse();
}

// Helper function to pretty print AST
export function printAST(node: ASTNode, indent: number = 0): string {
    const prefix = "  ".repeat(indent);

    if (node.type === "BinaryOp") {
        const binNode = node as BinaryOpNode;
        return `${prefix}BinaryOp(${binNode.operator})\n${printAST(binNode.left, indent + 1)}\n${printAST(binNode.right, indent + 1)}`;
    }

    if (node.type === "Comparison") {
        const compNode = node as ComparisonNode;
        return `${prefix}Comparison(${compNode.operator})\n${printAST(compNode.left, indent + 1)}\n${printAST(compNode.right, indent + 1)}`;
    }

    if (node.type === "Identifier") {
        const idNode = node as IdentifierNode;
        return `${prefix}Identifier(${idNode.name})`;
    }

    if (node.type === "Literal") {
        const litNode = node as LiteralNode;
        return `${prefix}Literal(${litNode.value})`;
    }

    return `${prefix}Unknown`;
}
