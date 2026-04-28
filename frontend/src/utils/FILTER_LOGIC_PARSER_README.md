# Filter Logic Parser - Thuật Toán Phân Tích Cú Pháp

## Giới Thiệu

**Filter Logic Parser** là một thuật toán phân tích cú pháp (Parser) có khả năng:

1. **Tokenize** - Phân tách chuỗi thành các tokens nhỏ
2. **Parse** - Xây dựng Cây cú pháp trừu tượng (AST - Abstract Syntax Tree)
3. **Evaluate** - Thực thi AST trên dữ liệu để lọc kết quả

## Kiến Trúc

```
Chuỗi công thức
     ↓
  [Lexer] ← Tokenize
     ↓
  Token List
     ↓
  [Parser] ← Build AST
     ↓
  Abstract Syntax Tree (AST)
     ↓
  [Evaluator] ← Evaluate trên dữ liệu
     ↓
  Matching & Not Matching data
```

## Các Thành Phần

### 1. Lexer (Tokenizer)

Chuyên trách phân tách chuỗi thành các tokens:

- **Tokens nhị phân**: `==`, `!=`, `<`, `>`, `<=`, `>=`
- **Logical operators**: `AND`, `OR`
- **Literals**: Numbers, Strings, Booleans (true/false), null
- **Identifiers**: Tên biến (SoNgay, NghiPhep, etc.)
- **Delimiters**: `(`, `)`

**Ví dụ:**

```
Input: "NghiPhep == true AND SoNgay <= 2"
Output: [
  {type: 'IDENTIFIER', value: 'NghiPhep'},
  {type: 'EQ', value: '=='},
  {type: 'BOOLEAN', value: true},
  {type: 'AND', value: 'AND'},
  {type: 'IDENTIFIER', value: 'SoNgay'},
  {type: 'LE', value: '<='},
  {type: 'NUMBER', value: 2},
  {type: 'EOF'}
]
```

### 2. Parser

Xây dựng cây cú pháp (AST) từ token list theo quy tắc ngữ pháp:

**Quy tắc Precedence (độ ưu tiên):**

```
1. Primary: Literals, Identifiers, Parentheses
2. Comparison: ==, !=, <, >, <=, >=
3. AND: Logical AND
4. OR: Logical OR (thấp nhất)
```

**Ví dụ AST:**

```
Formula: "NghiPhep == true AND SoNgay <= 2"

        BinaryOp(AND)
       /            \
   Comparison      Comparison
      ==             <=
     /  \           /   \
   NghiPhep true  SoNgay  2
```

### 3. Evaluator

Thực thi AST trên dữ liệu, trả về true/false cho mỗi item:

- Duyệt qua từng node của cây
- Tính toán giá trị tại mỗi node
- Trả về kết quả boolean cuối cùng

## Cách Sử Dụng

### Import

```typescript
import { parseAndFilterData } from "@/utils/filterLogicParser";
```

### Cú Pháp Cơ Bản

```typescript
const result = parseAndFilterData(formula, data, dataExtractor?);

// Result structure
{
  matching: any[],      // Dữ liệu match công thức
  notMatching: any[],   // Dữ liệu không match
  error?: string        // Thông báo lỗi nếu có
}
```

### Ví Dụ Đơn Giản

```typescript
const formula = "SoNgay <= 2";
const data = [{ requestId: { values: { SoNgay: 1 } } }, { requestId: { values: { SoNgay: 3 } } }];

const result = parseAndFilterData(formula, data);
// result.matching: [{ requestId: { values: { SoNgay: 1 } } }]
// result.notMatching: [{ requestId: { values: { SoNgay: 3 } } }]
```

### Ví Dụ Với Data Extractor Tùy Chỉnh

```typescript
const result = parseAndFilterData("salary >= 5000 AND department == 'IT'", employees, (emp) => ({
    salary: emp.salary,
    department: emp.dept.name,
}));
```

## Hỗ Trợ Operators

### So Sánh (Comparison)

| Operator | Ý Nghĩa           | Ví Dụ               |
| -------- | ----------------- | ------------------- |
| `==`     | Bằng              | `SoNgay == 2`       |
| `!=`     | Không bằng        | `NghiPhep != false` |
| `<`      | Nhỏ hơn           | `SoNgay < 3`        |
| `>`      | Lớn hơn           | `SoNgay > 1`        |
| `<=`     | Nhỏ hơn hoặc bằng | `SoNgay <= 2`       |
| `>=`     | Lớn hơn hoặc bằng | `SoNgay >= 1`       |

### Logic (Logical)

| Operator | Ý Nghĩa               | Ví Dụ                      |
| -------- | --------------------- | -------------------------- |
| `AND`    | Cả hai điều kiện      | `A == true AND B == false` |
| `OR`     | Ít nhất một điều kiện | `A == true OR B == true`   |

### Dữ Liệu Hỗ Trợ

- **Number**: `1`, `2`, `3.14`
- **String**: `"text"`, `'text'`
- **Boolean**: `true`, `false`
- **Null**: `null`
- **Identifier**: `SoNgay`, `NghiPhep`, `reason`

## Ví Dụ Công Thức

### Ví Dụ 1: Những đơn kỳ phép từ 1-2 ngày

```
NghiPhep == true AND SoNgay >= 1 AND SoNgay <= 2
```

### Ví Dụ 2: Những đơn khẩn cấp

```
SoNgay == 0 OR NghiPhep == false
```

### Ví Dụ 3: Những đơn cần xem xét kỹ

```
(NghiPhep == true AND SoNgay >= 3) OR SoNgay >= 5
```

### Ví Dụ 4: Kết hợp điều kiện phức tạp

```
(reason == "Bệnh" OR reason == "Tai nạn") AND SoNgay <= 2
```

## Xử Lý Lỗi

Parser có khả năng xử lý lỗi:

```typescript
const result = parseAndFilterData("invalid formula ===", data);

if (result.error) {
    console.log(`Lỗi: ${result.error}`);
    // Tất cả dữ liệu sẽ được đưa vào notMatching
}
```

## Cấu Trúc Dữ Liệu Mặc Định

Mặc định, parser trích xuất dữ liệu từ:

```typescript
item.requestId?.values;
```

Ví dụ:

```javascript
{
  _id: "...",
  requestId: {
    values: {
      SoNgay: 2,
      NghiPhep: true,
      reason: "Bệnh",
      ...
    },
    creatorId: { ... }
  }
}
```

## Debugging

### Xem AST (Abstract Syntax Tree)

```typescript
import { getAST, printAST } from "@/utils/filterLogicParser";

const ast = getAST("NghiPhep == true AND SoNgay <= 2");
console.log(printAST(ast));

// Output:
// BinaryOp(AND)
//   Comparison(==)
//     Identifier(NghiPhep)
//     Literal(true)
//   Comparison(<=)
//     Identifier(SoNgay)
//     Literal(2)
```

## Performance

- **Tokenization**: O(n) - n là độ dài chuỗi
- **Parsing**: O(m) - m là số lượng tokens
- **Evaluation**: O(k) - k là số lượng dữ liệu
- **Tổng**: O(n + m + k) = O(n + k)

## Edge Cases

1. **Công thức trống**: Tất cả dữ liệu → notMatching
2. **Lỗi evaluation**: Item đó → notMatching
3. **Undefined variable**: Ném lỗi, item → notMatching
4. **Type mismatch**: So sánh bình thường (JavaScript comparison rules)

## Tích Hợp Với Component

Xem ví dụ tích hợp trong [TeamRequests.tsx](../features/approvals/pages/TeamRequests.tsx):

```typescript
const filterResult = parseAndFilterData(inputFilter, allData, (item: any) => ({
    ...item.requestId?.values,
    SoNgay: item.requestId?.values?.SoNgay || 0,
    NghiPhep: item.requestId?.values?.NghiPhep ?? true,
}));

setDataMatching(filterResult.matching);
setDataNotMatching(filterResult.notMatching);
```

## Mở Rộng

Để thêm operator mới:

1. **Thêm Token Type** trong Lexer
2. **Cập nhật Lexer** để nhận dạng operator
3. **Cập nhật Parser** với quy tắc precedence
4. **Cập nhật Evaluator** để xử lý operator

## Tham Khảo

- Lexer/Tokenizer pattern
- Recursive descent parser
- Operator precedence parsing
- Abstract Syntax Tree (AST)
