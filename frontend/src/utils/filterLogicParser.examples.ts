/**
 * Filter Logic Parser - Examples and Usage Guide
 *
 * Thuật toán Parser phân tích chuỗi công thức logic thành Cây cú pháp trừu tượng (AST)
 */

import { parseAndFilterData, getAST, printAST } from "./filterLogicParser";

// ============ EXAMPLES ============

/**
 * Example 1: Basic Comparison
 * Lọc những đơn có SoNgay <= 2 ngày
 */
export function example1() {
    const formula = "SoNgay <= 2";

    const data = [
        { requestId: { values: { SoNgay: 1, NghiPhep: true } } },
        { requestId: { values: { SoNgay: 2, NghiPhep: true } } },
        { requestId: { values: { SoNgay: 3, NghiPhep: true } } },
        { requestId: { values: { SoNgay: 5, NghiPhep: true } } },
    ];

    const result = parseAndFilterData(formula, data);
    console.log("Example 1: SoNgay <= 2");
    console.log("Matching:", result.matching.length); // 2 items (SoNgay: 1, 2)
    console.log("Not Matching:", result.notMatching.length); // 2 items (SoNgay: 3, 5)
}

/**
 * Example 2: AND Operator
 * Lọc những đơn vừa là loại NghiPhep vừa có SoNgay <= 2
 */
export function example2() {
    const formula = "NghiPhep == true AND SoNgay <= 2";

    const data = [{ requestId: { values: { NghiPhep: true, SoNgay: 1 } } }, { requestId: { values: { NghiPhep: true, SoNgay: 3 } } }, { requestId: { values: { NghiPhep: false, SoNgay: 1 } } }];

    const result = parseAndFilterData(formula, data);
    console.log("Example 2: NghiPhep == true AND SoNgay <= 2");
    console.log("Matching:", result.matching.length); // 1 item
    console.log("Not Matching:", result.notMatching.length); // 2 items
}

/**
 * Example 3: OR Operator
 * Lọc những đơn hoặc là NghiPhep hoặc có SoNgay >= 5
 */
export function example3() {
    const formula = "NghiPhep == true OR SoNgay >= 5";

    const data = [{ requestId: { values: { NghiPhep: true, SoNgay: 1 } } }, { requestId: { values: { NghiPhep: false, SoNgay: 10 } } }, { requestId: { values: { NghiPhep: false, SoNgay: 2 } } }];

    const result = parseAndFilterData(formula, data);
    console.log("Example 3: NghiPhep == true OR SoNgay >= 5");
    console.log("Matching:", result.matching.length); // 2 items
    console.log("Not Matching:", result.notMatching.length); // 1 item
}

/**
 * Example 4: Parentheses for Grouping
 * Lọc những đơn: (NghiPhep == true AND SoNgay <= 2) OR SoNgay >= 10
 */
export function example4() {
    const formula = "(NghiPhep == true AND SoNgay <= 2) OR SoNgay >= 10";

    const data = [
        { requestId: { values: { NghiPhep: true, SoNgay: 1 } } },
        { requestId: { values: { NghiPhep: true, SoNgay: 5 } } },
        { requestId: { values: { NghiPhep: false, SoNgay: 15 } } },
        { requestId: { values: { NghiPhep: false, SoNgay: 3 } } },
    ];

    const result = parseAndFilterData(formula, data);
    console.log("Example 4: (NghiPhep == true AND SoNgay <= 2) OR SoNgay >= 10");
    console.log("Matching:", result.matching.length); // 2 items
    console.log("Not Matching:", result.notMatching.length); // 2 items
}

/**
 * Example 5: Complex Expression
 * Lọc những đơn phức tạp hơn
 */
export function example5() {
    const formula = "(NghiPhep == true AND SoNgay >= 1 AND SoNgay <= 3) OR (NghiPhep == false AND SoNgay <= 1)";

    const data = [
        { requestId: { values: { NghiPhep: true, SoNgay: 2 } } }, // Match: first condition
        { requestId: { values: { NghiPhep: false, SoNgay: 0 } } }, // Match: second condition
        { requestId: { values: { NghiPhep: true, SoNgay: 5 } } }, // No match
        { requestId: { values: { NghiPhep: false, SoNgay: 3 } } }, // No match
    ];

    const result = parseAndFilterData(formula, data);
    console.log("Example 5: Complex expression");
    console.log("Matching:", result.matching.length);
    console.log("Not Matching:", result.notMatching.length);
}

/**
 * Example 6: View AST (Abstract Syntax Tree)
 * Xem cấu trúc cây cú pháp của công thức
 */
export function example6() {
    const formula = "NghiPhep == true AND SoNgay <= 2";

    try {
        const ast = getAST(formula);
        console.log("Formula:", formula);
        console.log("AST:");
        console.log(printAST(ast));

        // Output sẽ giống như:
        // BinaryOp(AND)
        //   Comparison(==)
        //     Identifier(NghiPhep)
        //     Literal(true)
        //   Comparison(<=)
        //     Identifier(SoNgay)
        //     Literal(2)
    } catch (error: any) {
        console.error("Error:", error.message);
    }
}

/**
 * Example 7: Error Handling
 * Xử lý các lỗi công thức
 */
export function example7() {
    const formulas = [
        "NghiPhep == true AND", // Incomplete
        "NghiPhep === true", // Wrong operator
        "SoNgay <= ", // Missing operand
        "NghiPhep == true AND SoNgay <= 2", // Valid
    ];

    const data = [{ requestId: { values: { NghiPhep: true, SoNgay: 1 } } }];

    formulas.forEach((formula, index) => {
        const result = parseAndFilterData(formula, data);
        console.log(`Formula ${index + 1}: ${formula}`);
        if (result.error) {
            console.log(`Error: ${result.error}`);
        } else {
            console.log(`Success: ${result.matching.length} matching, ${result.notMatching.length} not matching`);
        }
        console.log("---");
    });
}

// ============ SUPPORTED OPERATORS ============

/*
COMPARISON OPERATORS:
  == : Equal
  != : Not equal
  <  : Less than
  >  : Greater than
  <= : Less than or equal
  >= : Greater than or equal

LOGICAL OPERATORS:
  AND : Both conditions must be true
  OR  : At least one condition must be true

GROUPING:
  ( ) : Parentheses for grouping expressions

DATA TYPES:
  Identifier : Variable name (e.g., SoNgay, NghiPhep)
  Number     : Numeric literal (e.g., 2, 10, 3.14)
  String     : String literal (e.g., "abc", 'xyz')
  Boolean    : true, false, null
  null       : Null value
*/

// ============ COMMON USE CASES ============

export const CommonFormulas = {
    // Lọc những đơn kỳ phép từ 1-2 ngày
    shortLeave: "SoNgay >= 1 AND SoNgay <= 2",

    // Lọc những đơn khẩn cấp (SoNgay = 0 hoặc loại khẩn cấp)
    emergency: "SoNgay == 0 OR NghiPhep == false",

    // Lọc những đơn kỳ phép dài (từ 3 ngày trở lên)
    longLeave: "NghiPhep == true AND SoNgay >= 3",

    // Lọc những đơn phức tạp cần xem xét kỹ
    complex: "(NghiPhep == true AND SoNgay >= 5) OR (NghiPhep == false)",
};

/**
 * Demo function - chạy tất cả examples
 */
export function runAllExamples() {
    console.log("=== Filter Logic Parser Examples ===\n");
    example1();
    console.log("\n");
    example2();
    console.log("\n");
    example3();
    console.log("\n");
    example4();
    console.log("\n");
    example5();
    console.log("\n");
    example6();
    console.log("\n");
    example7();
}
