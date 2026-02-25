# LRM (Leave/Request Management) - Hệ thống Quản lý Đơn từ & Phê duyệt Doanh nghiệp

LRM là giải pháp số hóa quy trình quản trị nội bộ, giúp doanh nghiệp quản lý các loại đơn từ (nghỉ phép, OT, công tác phí...) và quy trình phê duyệt đa cấp một cách minh bạch, hiệu quả.

---

## 🚀 Tính năng chính

- **Quản lý đơn từ**: Tạo, chỉnh sửa và theo dõi trạng thái các loại đơn (Nghỉ phép, Làm thêm giờ, Công tác...).
- **Luồng phê duyệt (Workflow)**: Hỗ trợ phê duyệt đa cấp (Manager → HR → Director).
- **Quản lý số dư**: Tự động tính toán và quản lý ngày phép còn lại của nhân viên.
- **Phân quyền (RBAC)**: Phân chia vai trò rõ ràng giữa Admin, Manager và Employee.
- **Thông báo**: Cập nhật trạng thái đơn từ thời gian thực qua hệ thống thông báo nội bộ.

---

## 🛠 Công nghệ sử dụng

### Backend

- **Node.js & Express.js**: Framework chính xử lý logic server.
- **Authentication**: JWT (JSON Web Token) để định danh và bảo mật.
- **Security**: bcrypt để mã hóa mật khẩu người dùng.
- **Database**: (Tùy chọn: MongoDB/PostgreSQL) với các bảng logic chặt chẽ.

### Frontend

- **React.js (Vite)**: Thư viện UI nhanh và tối ưu.
- **Tailwind CSS & ShadcnUI**: Xây dựng giao diện hiện đại, chuẩn Enterprise.
- **Axios**: Xử lý các HTTP requests đến Backend.

---

## 📂 Cấu trúc dự án

### Backend (Pattern: MVC + Services)

```
server/
├── controllers/   # Xử lý logic Request/Response, điều hướng luồng dữ liệu.
├── models/        # Định nghĩa Schema (DBML) và cấu trúc dữ liệu Database.
├── middlewares/   # Kiểm tra Auth (JWT), Check Role, Validation dữ liệu.
├── routers/       # Định nghĩa các Endpoint API (ví dụ: /api/v1/requests).
├── services/      # Chứa logic nghiệp vụ phức tạp (Tính toán số ngày phép, logic chuyển bước duyệt).
└── utils/         # Các hàm tiện ích dùng chung (Helper functions).
```

### Frontend (Pattern: Modular React)

```
client/
├── src/
│   ├── components/  # Các UI Component nhỏ tái sử dụng (Button, Modal, Badge).
│   ├── layouts/     # Bố cục trang (Sidebar, Navbar cho Dashboard).
│   ├── hooks/       # Custom hooks xử lý logic riêng biệt (useAuth, useFetch).
│   ├── context/     # Quản lý State toàn cục (User info, Theme, Notification).
│   ├── services/    # Các hàm gọi API (Axios instance, Request API).
│   └── pages/       # Các màn hình chính (Login, Dashboard, RequestDetail).
```

---

## ⚙️ Cài đặt & Sử dụng

### 1. Cài đặt Backend

1. Di chuyển vào thư mục server:

    ```bash
    cd server
    ```

2. Cài đặt dependencies:

    ```bash
    npm install
    ```

3. Tạo file `.env` và cấu hình: `PORT`, `DATABASE_URL`, `JWT_SECRET`.

4. Khởi chạy:
    ```bash
    npm run dev
    ```

### 2. Cài đặt Frontend

1. Di chuyển vào thư mục client:

    ```bash
    cd client
    ```

2. Cài đặt dependencies:

    ```bash
    npm install
    ```

3. Chạy ứng dụng:
    ```bash
    npm run dev
    ```

---

## 📖 Hướng dẫn sử dụng cơ bản

1. **Đăng nhập**: Sử dụng tài khoản nhân viên được cấp để truy cập vào LRM.
2. **Tạo đơn**: Truy cập mục "Tạo đơn mới", chọn loại đơn và điền thông tin (metadata).
3. **Duyệt đơn** (Dành cho Manager): Kiểm tra danh sách "Pending Approvals", xem chi tiết và nhấn Approve hoặc Reject kèm ghi chú.
4. **Theo dõi**: Nhân viên xem tiến độ phê duyệt qua Timeline tại màn hình Chi tiết đơn.
