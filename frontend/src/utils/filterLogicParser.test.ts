/**
 * Filter Logic Parser - Unit Tests
 */

import { parseAndFilterData, getAST, printAST } from "./filterLogicParser";

interface TestCase {
    name: string;
    formula: string;
    data: any[];
    expectedMatching: number;
    expectedNotMatching: number;
}

const testCases: TestCase[] = [
    {
        name: "Basic comparison: totalDays <= 2",
        formula: "totalDays <= 2",
        data: [
            { requestId: { values: { totalDays: 1 } } },
            { requestId: { values: { totalDays: 2 } } },
            { requestId: { values: { totalDays: 3 } } },
        ],
        expectedMatching: 2,
        expectedNotMatching: 1,
    },
    {
        name: "LIKE operator - search reason",
        formula: "reason LIKE 'Bệnh'",
        data: [
            { requestId: { values: { reason: "Bệnh" } } },
            { requestId: { values: { reason: "Bị bệnh" } } },
            { requestId: { values: { reason: "Tai nạn" } } },
        ],
        expectedMatching: 2,
        expectedNotMatching: 1,
    },
    {
        name: "AND operator with totalDays",
        formula: "totalDays >= 1 AND totalDays <= 3",
        data: [
            { requestId: { values: { totalDays: 0 } } },
            { requestId: { values: { totalDays: 2 } } },
            { requestId: { values: { totalDays: 5 } } },
        ],
        expectedMatching: 1,
        expectedNotMatching: 2,
    },
    {
        name: "Combined - totalDays and reason",
        formula: "totalDays <= 2 AND reason LIKE 'Bệnh'",
        data: [
            { requestId: { values: { totalDays: 1, reason: "Bệnh" } } },
            { requestId: { values: { totalDays: 1, reason: "Tai nạn" } } },
            { requestId: { values: { totalDays: 5, reason: "Bệnh" } } },
        ],
        expectedMatching: 1,
        expectedNotMatching: 2,
    },
        name: "OR operator",
        formula: "NghiPhep == true OR SoNgay >= 5",
        data: [{ requestId: { values: { NghiPhep: true, SoNgay: 1 } } }, { requestId: { values: { NghiPhep: false, SoNgay: 10 } } }, { requestId: { values: { NghiPhep: false, SoNgay: 2 } } }],
        expectedMatching: 2,
        expectedNotMatching: 1,
    },
    {
        name: "Parentheses grouping",
        formula: "(NghiPhep == true AND SoNgay <= 2) OR SoNgay >= 10",
        data: [
            { requestId: { values: { NghiPhep: true, SoNgay: 1 } } },
            { requestId: { values: { NghiPhep: true, SoNgay: 5 } } },
            { requestId: { values: { NghiPhep: false, SoNgay: 15 } } },
            { requestId: { values: { NghiPhep: false, SoNgay: 3 } } },
        ],
        expectedMatching: 2,
        expectedNotMatching: 2,
    },
    {
        name: "Not equal operator",
        formula: "NghiPhep != false",
        data: [{ requestId: { values: { NghiPhep: true } } }, { requestId: { values: { NghiPhep: false } } }],
        expectedMatching: 1,
        expectedNotMatching: 1,
    },
    {
        name: "Greater than",
        formula: "SoNgay > 2",
        data: [{ requestId: { values: { SoNgay: 1 } } }, { requestId: { values: { SoNgay: 2 } } }, { requestId: { values: { SoNgay: 3 } } }],
        expectedMatching: 1,
        expectedNotMatching: 2,
    },
    {
        name: "Greater than or equal",
        formula: "SoNgay >= 2",
        data: [{ requestId: { values: { SoNgay: 1 } } }, { requestId: { values: { SoNgay: 2 } } }, { requestId: { values: { SoNgay: 3 } } }],
        expectedMatching: 2,
        expectedNotMatching: 1,
    },
    {
        name: "Complex AND expression",
        formula: "NghiPhep == true AND SoNgay >= 1 AND SoNgay <= 3",
        data: [{ requestId: { values: { NghiPhep: true, SoNgay: 0 } } }, { requestId: { values: { NghiPhep: true, SoNgay: 2 } } }, { requestId: { values: { NghiPhep: true, SoNgay: 5 } } }],
        expectedMatching: 1,
        expectedNotMatching: 2,
    },
    {
        name: "String comparison",
        formula: 'reason == "Bệnh"',
        data: [{ requestId: { values: { reason: "Bệnh" } } }, { requestId: { values: { reason: "Tai nạn" } } }],
        expectedMatching: 1,
        expectedNotMatching: 1,
    },
    {
        name: "Boolean true",
        formula: "NghiPhep == true",
        data: [{ requestId: { values: { NghiPhep: true } } }, { requestId: { values: { NghiPhep: false } } }],
        expectedMatching: 1,
        expectedNotMatching: 1,
    },
];

// Test runner
export function runTests() {
    console.log("=== Filter Logic Parser Tests ===\n");

    let passed = 0;
    let failed = 0;

    for (const testCase of testCases) {
        try {
            const result = parseAndFilterData(testCase.formula, testCase.data);

            const matchingOk = result.matching.length === testCase.expectedMatching;
            const notMatchingOk = result.notMatching.length === testCase.expectedNotMatching;
            const isPass = matchingOk && notMatchingOk;

            if (isPass) {
                console.log(`✓ PASS: ${testCase.name}`);
                passed++;
            } else {
                console.log(`✗ FAIL: ${testCase.name}`);
                console.log(`  Expected: ${testCase.expectedMatching} matching, ${testCase.expectedNotMatching} not matching`);
                console.log(`  Got: ${result.matching.length} matching, ${result.notMatching.length} not matching`);
                failed++;
            }
        } catch (error: any) {
            console.log(`✗ ERROR: ${testCase.name}`);
            console.log(`  ${error.message}`);
            failed++;
        }
    }

    console.log(`\n=== Summary ===`);
    console.log(`Passed: ${passed}/${testCases.length}`);
    console.log(`Failed: ${failed}/${testCases.length}`);

    return { passed, failed };
}

// AST visualization test
export function testASTVisualization() {
    console.log("\n=== AST Visualization Test ===\n");

    const formulas = ["SoNgay <= 2", "NghiPhep == true AND SoNgay <= 2", "(NghiPhep == true AND SoNgay <= 2) OR SoNgay >= 10"];

    for (const formula of formulas) {
        try {
            const ast = getAST(formula);
            console.log(`Formula: "${formula}"`);
            console.log("AST:");
            console.log(printAST(ast));
            console.log("\n");
        } catch (error: any) {
            console.log(`Error: ${error.message}\n`);
        }
    }
}

// Error handling test
export function testErrorHandling() {
    console.log("=== Error Handling Test ===\n");

    const invalidFormulas = [
        "NghiPhep ==", // Missing right operand
        "== true", // Missing left operand
        "NghiPhep === true", // Invalid operator
        "SoNgay <=", // Missing right operand
        "NghiPhep AND", // Missing right operand
        "(NghiPhep == true", // Unmatched parenthesis
    ];

    const data = [{ requestId: { values: { NghiPhep: true, SoNgay: 1 } } }];

    for (const formula of invalidFormulas) {
        const result = parseAndFilterData(formula, data);
        console.log(`Formula: "${formula}"`);
        if (result.error) {
            console.log(`✓ Error caught: ${result.error}`);
        } else {
            console.log(`✗ No error detected (should have failed)`);
        }
        console.log("");
    }
}

// Performance test
export function testPerformance() {
    console.log("=== Performance Test ===\n");

    const formula = "NghiPhep == true AND SoNgay >= 1 AND SoNgay <= 3";
    const sizes = [100, 1000, 10000];

    for (const size of sizes) {
        const data = Array.from({ length: size }, (_, i) => ({
            requestId: {
                values: {
                    NghiPhep: i % 2 === 0,
                    SoNgay: (i % 5) + 1,
                },
            },
        }));

        const start = performance.now();
        const result = parseAndFilterData(formula, data);
        const end = performance.now();

        console.log(`Data size: ${size}`);
        console.log(`Time: ${(end - start).toFixed(2)}ms`);
        console.log(`Matching: ${result.matching.length}`);
        console.log(`Not Matching: ${result.notMatching.length}`);
        console.log("");
    }
}

// Run all tests
export function runAllTests() {
    runTests();
    testASTVisualization();
    testErrorHandling();
    testPerformance();
}
