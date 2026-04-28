// VỊ TRÍ GẮN FILE: frontend/src/features/approvals/rule-engine/astParser.ts
// AST Parser & Evaluator (Rule Engine)
// Không sử dụng eval(), phân tích chuỗi thành Abstract Syntax Tree và evaluate logic.

type TokenType = 'IDENTIFIER' | 'LITERAL' | 'OPERATOR' | 'LPAREN' | 'RPAREN' | 'AND' | 'OR';

interface Token {
    type: TokenType;
    value: string;
}

// 1. Tokenizer (Lexer): Chuyển đổi chuỗi đầu vào thành mảng các Token
export function tokenize(input: string): Token[] {
    const tokens: Token[] = [];
    let i = 0;

    while (i < input.length) {
        const char = input[i];

        // Bỏ qua khoảng trắng
        if (/\s/.test(char)) {
            i++;
            continue;
        }

        // Dấu ngoặc
        if (char === '(') { tokens.push({ type: 'LPAREN', value: '(' }); i++; continue; }
        if (char === ')') { tokens.push({ type: 'RPAREN', value: ')' }); i++; continue; }

        // Toán tử so sánh: ==, <=, >=, !=, <, >
        if (input.slice(i, i + 2) === '==') { tokens.push({ type: 'OPERATOR', value: '==' }); i += 2; continue; }
        if (input.slice(i, i + 2) === '<=') { tokens.push({ type: 'OPERATOR', value: '<=' }); i += 2; continue; }
        if (input.slice(i, i + 2) === '>=') { tokens.push({ type: 'OPERATOR', value: '>=' }); i += 2; continue; }
        if (input.slice(i, i + 2) === '!=') { tokens.push({ type: 'OPERATOR', value: '!=' }); i += 2; continue; }
        if (char === '<' || char === '>') { tokens.push({ type: 'OPERATOR', value: char }); i++; continue; }

        // Toán tử logic: AND, OR
        if (input.slice(i, i + 3) === 'AND') { tokens.push({ type: 'AND', value: 'AND' }); i += 3; continue; }
        if (input.slice(i, i + 2) === 'OR') { tokens.push({ type: 'OR', value: 'OR' }); i += 2; continue; }

        // Giá trị chuỗi (LITERAL bọc trong ngoặc kép)
        if (char === '"') {
            let str = '';
            i++;
            while (i < input.length && input[i] !== '"') {
                str += input[i];
                i++;
            }
            tokens.push({ type: 'LITERAL', value: `"${str}"` });
            i++; // skip closing quote
            continue;
        }

        // Tên biến (IDENTIFIER), Booleans, Số (Numbers)
        let val = '';
        while (i < input.length && /[a-zA-Z0-9_.]/.test(input[i])) {
            val += input[i];
            i++;
        }
        
        if (val === 'true' || val === 'false') {
            tokens.push({ type: 'LITERAL', value: val });
        } else if (!isNaN(Number(val)) && val.length > 0) {
            tokens.push({ type: 'LITERAL', value: val });
        } else if (val) {
            tokens.push({ type: 'IDENTIFIER', value: val });
        }
    }
    return tokens;
}

// Các định nghĩa Node cho AST
type ASTNode =
    | { type: 'LOGICAL_EXPRESSION', operator: 'AND' | 'OR', left: ASTNode, right: ASTNode }
    | { type: 'COMPARISON_EXPRESSION', operator: string, left: ASTNode, right: ASTNode }
    | { type: 'IDENTIFIER', name: string }
    | { type: 'LITERAL', value: any };

// 2. Parser: Phân tích cú pháp mảng Token thành cây AST
export function parse(tokens: Token[]): ASTNode {
    let current = 0;

    // Phân tích biểu thức cơ bản (So sánh hoặc giá trị trong ngoặc)
    function walk(): ASTNode {
        let token = tokens[current];

        if (token.type === 'LPAREN') {
            current++;
            let node = walkLogical(); // Phân tích biểu thức con bên trong
            if (tokens[current] && tokens[current].type === 'RPAREN') {
                current++;
            }
            return node;
        }

        // Đọc vế trái (Left operand)
        let leftNode: ASTNode;
        if (token.type === 'IDENTIFIER') {
            leftNode = { type: 'IDENTIFIER', name: token.value };
            current++;
        } else if (token.type === 'LITERAL') {
            leftNode = { type: 'LITERAL', value: parseLiteralValue(token.value) };
            current++;
        } else {
            throw new Error(`Unexpected token at position ${current}: ${token?.value}`);
        }

        token = tokens[current];
        // Đọc toán tử và vế phải (Right operand) nếu có
        if (token && token.type === 'OPERATOR') {
            const op = token.value;
            current++;
            const rightToken = tokens[current];
            let rightNode: ASTNode;
            
            if (rightToken.type === 'IDENTIFIER') {
                rightNode = { type: 'IDENTIFIER', name: rightToken.value };
                current++;
            } else if (rightToken.type === 'LITERAL') {
                rightNode = { type: 'LITERAL', value: parseLiteralValue(rightToken.value) };
                current++;
            } else {
                throw new Error("Expected right operand for comparison");
            }
            return { type: 'COMPARISON_EXPRESSION', operator: op, left: leftNode, right: rightNode };
        }

        return leftNode;
    }

    // Phân tích biểu thức Logic (AND, OR) liên kết các biểu thức cơ bản
    function walkLogical(): ASTNode {
        let left = walk();

        while (current < tokens.length) {
            const token = tokens[current];
            if (token.type === 'AND' || token.type === 'OR') {
                current++;
                const right = walk();
                left = {
                    type: 'LOGICAL_EXPRESSION',
                    operator: token.value as 'AND' | 'OR',
                    left,
                    right
                };
            } else {
                break;
            }
        }
        return left;
    }

    if (tokens.length === 0) return { type: 'LITERAL', value: true }; // Trả về true nếu không có Rule
    return walkLogical();
}

// Ép kiểu các giá trị Literal
function parseLiteralValue(val: string): any {
    if (val === 'true') return true;
    if (val === 'false') return false;
    if (val.startsWith('"') && val.endsWith('"')) return val.slice(1, -1);
    if (!isNaN(Number(val))) return Number(val);
    return val;
}

// 3. Evaluator: Chạy dữ liệu đầu vào trên cây AST để lấy kết quả (true/false)
export function evaluate(node: ASTNode, data: any): boolean {
    if (node.type === 'LOGICAL_EXPRESSION') {
        const leftVal = evaluate(node.left, data);
        // Short-circuit evaluation
        if (node.operator === 'AND') return leftVal && evaluate(node.right, data);
        if (node.operator === 'OR') return leftVal || evaluate(node.right, data);
    }
    
    if (node.type === 'COMPARISON_EXPRESSION') {
        const leftVal = getValue(node.left, data);
        const rightVal = getValue(node.right, data);
        
        switch (node.operator) {
            case '==': return leftVal == rightVal; // Loose equality (có thể dùng === tùy nhu cầu)
            case '!=': return leftVal != rightVal;
            case '<': return leftVal < rightVal;
            case '<=': return leftVal <= rightVal;
            case '>': return leftVal > rightVal;
            case '>=': return leftVal >= rightVal;
            default: throw new Error(`Unknown operator: ${node.operator}`);
        }
    }
    return false;
}

// Helper lấy giá trị động từ Data object
function getValue(node: ASTNode, data: any): any {
    if (node.type === 'LITERAL') return node.value;
    if (node.type === 'IDENTIFIER') return data[node.name];
    throw new Error("Invalid node for evaluation");
}

// 4. Hàm Wrapper để chạy End-to-end
export function runRuleEngine(ruleStr: string, data: any): boolean {
    if (!ruleStr || ruleStr.trim() === '') return true; // Rule rỗng -> true
    try {
        const tokens = tokenize(ruleStr);
        const ast = parse(tokens);
        return evaluate(ast, data);
    } catch (error) {
        console.error("Rule Engine Error:", error);
        return false;
    }
}
