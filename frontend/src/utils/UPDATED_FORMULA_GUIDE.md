# Filter Logic Parser - Cập Nhật Công Thức Mới

## Thay Đổi Chính

### Từ (Cũ) → Sang (Mới)

- `SoNgay` → `totalDays` (số ngày nghỉ)
- `NghiPhep` → ❌ Loại bỏ (mặc định tất cả là kỳ phép)
- Thêm operator `LIKE` để tìm kiếm chuỗi

---

## Các Biến Hỗ Trợ

| Biến        | Loại   | Ví Dụ                 | Mô Tả          |
| ----------- | ------ | --------------------- | -------------- |
| `totalDays` | Number | `1`, `2`, `5`         | Số ngày nghỉ   |
| `reason`    | String | `"Bệnh"`, `"Tai nạn"` | Lý do xin nghỉ |

---

## Các Operator

### So Sánh Số

```
==   Bằng
!=   Không bằng
<    Nhỏ hơn
>    Lớn hơn
<=   Nhỏ hơn hoặc bằng
>=   Lớn hơn hoặc bằng
```

### Tìm Kiếm Chuỗi

```
LIKE   Tìm kiếm (không phân biệt hoa/thường)
       Ví dụ: reason LIKE 'Bệnh'
       → Khớp với: "bệnh", "Bệnh", "Bệnh nhân", etc.
```

### Logic

```
AND    Cả hai điều kiện đều đúng
OR     Ít nhất một điều kiện đúng
()     Nhóm biểu thức
```

---

## Công Thức Ví Dụ

### Ví Dụ 1: Lọc nghỉ từ 1-2 ngày

```
totalDays >= 1 AND totalDays <= 2
```

### Ví Dụ 2: Lọc 1 ngày

```
totalDays == 1
```

### Ví Dụ 3: Tìm lý do chứa "Bệnh"

```
reason LIKE 'Bệnh'
```

### Ví Dụ 4: Kết hợp - Nhỏ 2 ngày AND lý do Bệnh

```
totalDays <= 2 AND reason LIKE 'Bệnh'
```

### Ví Dụ 5: Kết hợp - Từ 1-3 ngày AND (Bệnh HOẶC Tai nạn)

```
totalDays >= 1 AND totalDays <= 3 AND (reason LIKE 'Bệnh' OR reason LIKE 'Tai nạn')
```

### Ví Dụ 6: Tìm kiếm chứa một trong các từ

```
reason LIKE 'Ốm' OR reason LIKE 'Sốt' OR reason LIKE 'Bệnh'
```

### Ví Dụ 7: Lọc >= 5 ngày

```
totalDays >= 5
```

---

## So Sánh Cũ vs Mới

### Cũ

```
NghiPhep == true AND SoNgay <= 2
```

### Mới

```
totalDays <= 2
```

### Cũ

```
SoNgay >= 1 AND SoNgay <= 3
```

### Mới

```
totalDays >= 1 AND totalDays <= 3
```

### (Không có công thức tương đương cũ)

### Mới

```
reason LIKE 'Bệnh'
```

---

## Operator LIKE Chi Tiết

### Cách Hoạt Động

- **Không phân biệt hoa/thường** (case-insensitive)
- **Tìm kiếm con chuỗi** (substring search)

### Ví Dụ LIKE

```
reason LIKE 'Bệnh'         → Khớp: "Bệnh", "bệnh", "Bệnh nhân"
reason LIKE 'Tai nạn'      → Khớp: "Tai nạn", "TAI NẠN", "tai nạn giao thông"
reason LIKE 'ốm'           → Khớp: "Ốm đột xuất", "ốm sốt", "bị ốm"
```

### Không Khớp

```
reason LIKE 'Bệnh'         → Không khớp: "Tai nạn", "Hỏa hoạn"
reason LIKE 'Bệnh viện'    → Không khớp: "Bệnh" (phải chứa cả "viện")
```

---

## Lỗi Thường Gặp

| Lỗi               | Đúng                 | Sai                |
| ----------------- | -------------------- | ------------------ |
| Quên ngoặc kép    | `reason LIKE 'Bệnh'` | `reason LIKE Bệnh` |
| Operator sai      | `totalDays <= 2`     | `totalDays =< 2`   |
| Thiếu giá trị     | `totalDays == 2`     | `totalDays ==`     |
| Sử dụng SoNgay cũ | `totalDays <= 2`     | `SoNgay <= 2`      |
| Sử dụng NghiPhep  | ❌ Không dùng        | `NghiPhep == true` |

---

## Tips

### Tip 1: Dùng Ngoặc Để Rõ Ràng

```javascript
// Tốt
(totalDays >= 1 AND totalDays <= 3) OR reason LIKE 'Khẩn cấp'

// Cũng được nhưng ít rõ ràng
totalDays >= 1 AND totalDays <= 3 OR reason LIKE 'Khẩn cấp'
```

### Tip 2: Test Công Thức Từ Đơn Giản Đến Phức Tạp

```javascript
// Test từng phần
totalDays <= 2                          // ✓ Test đơn
totalDays <= 2 AND reason LIKE 'Bệnh'  // ✓ Test kết hợp
```

### Tip 3: LIKE Không Cần %

```javascript
// Không cần % như SQL
reason LIKE 'Bệnh'           // ✓ Đúng
reason LIKE '%Bệnh%'         // ✗ Sai

// Nó tự động tìm con chuỗi
```

---

## Troubleshooting

### Không Có Dữ Liệu Match

1. Kiểm tra tên biến (phải là `totalDays` hoặc `reason`)
2. Kiểm tra dữ liệu gốc có những giá trị đó không
3. Với LIKE: kiểm tra ký tự có đúng không (chuỗi tìm là con chuỗi)

### Lỗi Công Thức

1. Kiểm tra ngoặc cân bằng
2. Kiểm tra operator (phải là ==, !=, <, >, <=, >=, LIKE)
3. Kiểm tra không có token bị thiếu

### Debug Công Thức

Console sẽ hiển thị lỗi chi tiết khi công thức không hợp lệ

---

## Tài Liệu Liên Quan

- [README Chính](./FILTER_LOGIC_PARSER_README.md)
- [Quick Reference](./QUICK_REFERENCE.md)
- [Test Cases](./filterLogicParser.test.ts)

---

**Cập nhật:** 2024-04
