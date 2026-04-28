# Filter Logic Parser - Quick Reference Guide

## 🎯 Các Công Thức Thường Dùng

### Lọc Nghỉ Phép Theo Số Ngày

| Mục Đích      | Công Thức                     |
| ------------- | ----------------------------- |
| Lọc 1-2 ngày  | `SoNgay >= 1 AND SoNgay <= 2` |
| Lọc 1 ngày    | `SoNgay == 1`                 |
| Lọc 2-3 ngày  | `SoNgay >= 2 AND SoNgay <= 3` |
| Lọc >= 5 ngày | `SoNgay >= 5`                 |
| Lọc < 1 ngày  | `SoNgay < 1`                  |

### Lọc Theo Loại Nghỉ

| Mục Đích           | Công Thức           |
| ------------------ | ------------------- |
| Loại kỳ phép       | `NghiPhep == true`  |
| Không phải kỳ phép | `NghiPhep == false` |
| Nghỉ khẩn cấp      | `NghiPhep == false` |

### Lọc Kết Hợp

| Mục Đích                       | Công Thức                                          |
| ------------------------------ | -------------------------------------------------- |
| Kỳ phép 1-2 ngày               | `NghiPhep == true AND SoNgay >= 1 AND SoNgay <= 2` |
| Kỳ phép 3+ ngày                | `NghiPhep == true AND SoNgay >= 3`                 |
| Không phải kỳ phép 1 ngày      | `NghiPhep == false AND SoNgay == 1`                |
| Kỳ phép hoặc khẩn cấp < 1 ngày | `(NghiPhep == true) OR (SoNgay < 1)`               |

---

## 📝 Cú Pháp Cơ Bản

### Toán Tử So Sánh

```
==   Bằng
!=   Không bằng
<    Nhỏ hơn
>    Lớn hơn
<=   Nhỏ hơn hoặc bằng
>=   Lớn hơn hoặc bằng
```

### Toán Tử Logic

```
AND  Cả hai điều kiện đều đúng
OR   Ít nhất một điều kiện đúng
()   Nhóm biểu thức
```

### Kiểu Dữ Liệu

```
Number:    1, 2, 3, 3.14
String:    "text", 'text'
Boolean:   true, false
Null:      null
```

---

## 💡 Ví Dụ Thực Tế

### Ví Dụ 1: Duyệt nhanh kỳ phép 1-2 ngày khẩn cấp

**Công thức:**

```
NghiPhep == true AND SoNgay >= 1 AND SoNgay <= 2
```

**Ý nghĩa:** Những đơn xin kỳ phép từ 1 đến 2 ngày → có thể duyệt nhanh

---

### Ví Dụ 2: Lọc các đơn cần xem xét kỹ

**Công thức:**

```
(NghiPhep == true AND SoNgay >= 3) OR (NghiPhep == false AND SoNgay >= 2)
```

**Ý nghĩa:** Những đơn kỳ phép từ 3 ngày trở lên HOẶC những đơn khẩn cấp 2 ngày trở lên

---

### Ví Dụ 3: Đơn khẩn cấp cần xử lý ngay

**Công thức:**

```
NghiPhep == false
```

**Ý nghĩa:** Những đơn không phải kỳ phép (khẩn cấp, việc đột xuất)

---

## ⚠️ Lỗi Thường Gặp

| Lỗi             | Đúng                    | Sai                  |
| --------------- | ----------------------- | -------------------- |
| Thiếu operator  | `SoNgay == 2`           | `SoNgay 2`           |
| Operator sai    | `SoNgay == 2`           | `SoNgay === 2`       |
| Thiếu giá trị   | `SoNgay == 2`           | `SoNgay ==`          |
| Ngoặc không cân | `(A == 1) AND (B == 2)` | `(A == 1 AND B == 2` |
| Từ khóa sai     | `true`                  | `True` hoặc `TRUE`   |

---

## 🔍 Kiểm Tra Công Thức

### Cách Test Công Thức Trong Console

```javascript
// Import functions
import { parseAndFilterData, getAST, printAST } from "@/utils/filterLogicParser";

// Test 1: Xem AST
const formula = "NghiPhep == true AND SoNgay <= 2";
const ast = getAST(formula);
console.log(printAST(ast));

// Test 2: Xem kết quả lọc
const result = parseAndFilterData(formula, data);
console.log("Matching:", result.matching.length);
console.log("Not Matching:", result.notMatching.length);

// Test 3: Kiểm tra lỗi
if (result.error) {
    console.log("Error:", result.error);
}
```

---

## 📋 Checklist Viết Công Thức

- [ ] Kiểm tra tên biến có đúng không (SoNgay, NghiPhep)
- [ ] Kiểm tra operator có đúng không (==, !=, <, >, <=, >=)
- [ ] Kiểm tra dùng AND/OR có đúng chỗ không
- [ ] Kiểm tra ngoặc cân bằng
- [ ] Kiểm tra kiểu dữ liệu phù hợp
- [ ] Test công thức với vài dữ liệu sample

---

## 🎓 Thứ Tự Ưu Tiên (Precedence)

Toán tử được tính theo thứ tự:

1. **Ngoặc ()** - Cao nhất
2. **So sánh** (==, !=, <, >, <=, >=)
3. **AND** - Cao hơn OR
4. **OR** - Thấp nhất

**Ví dụ:**

```
A == 1 AND B == 2 OR C == 3
→ (A == 1 AND B == 2) OR C == 3  ✓ Đúng
→ A == 1 AND (B == 2 OR C == 3)  ✗ Sai
```

---

## 🚀 Tips & Tricks

### Tip 1: Dùng Ngoặc Để Rõ Ràng

```javascript
// Rõ ràng hơn
(NghiPhep == true AND SoNgay <= 2) OR (NghiPhep == false)

// So với không dùng ngoặc
NghiPhep == true AND SoNgay <= 2 OR NghiPhep == false
```

### Tip 2: Chia Nhỏ Điều Kiện Phức Tạp

```javascript
// Nếu công thức quá dài, tách riêng:

// Công thức gốc (dài)
(Type == "urgent" AND Days >= 1 AND Days <= 2) OR (Type == "medical" AND Days >= 1 AND Days <= 3) OR (Days >= 5)

// Chia thành từng phần để test
// Phần 1: Type == "urgent" AND Days >= 1 AND Days <= 2
// Phần 2: Type == "medical" AND Days >= 1 AND Days <= 3
// Phần 3: Days >= 5
```

### Tip 3: So Sánh String

```javascript
// So sánh với string cần dùng ngoặc kép hoặc ngoặc đơn
reason == "Bệnh"
reason == 'Tai nạn'

// Không được
reason == Bệnh  ✗
```

---

## 🆘 Khi Gặp Vấn Đề

### Không Có Dữ Liệu Match

1. Kiểm tra tên biến có đúng không
2. Kiểm tra dữ liệu gốc có những giá trị đó không
3. Test công thức với dữ liệu cụ thể

### Công Thức Báo Lỗi

1. Kiểm tra ngoặc cân bằng
2. Kiểm tra operator có đúng không
3. Kiểm tra không có token bị thiếu (ví dụ: `SoNgay ==` thiếu giá trị)

### Dữ Liệu Sai Lệch

1. Kiểm tra data extractor có chính xác không
2. Kiểm tra cấu trúc dữ liệu khớp với công thức không
3. In ra console để debug

---

## 📚 Tài Liệu Liên Quan

- [README Chi Tiết](./FILTER_LOGIC_PARSER_README.md)
- [Ví Dụ Code](./filterLogicParser.examples.ts)
- [Test Cases](./filterLogicParser.test.ts)

---

**Cập nhật lần cuối:** 2024
