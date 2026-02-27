# 📋 Leave Request Management System — Backend

Hệ thống quản lý đơn từ (nghỉ phép, làm thêm giờ, thanh toán công tác phí...) dành cho doanh nghiệp. Backend được xây dựng bằng **NestJS** + **MongoDB**, hỗ trợ đa cấp phê duyệt, phân quyền linh hoạt và quản lý số dư ngày nghỉ.

---

## 🚀 Công nghệ sử dụng

| Công nghệ                                                       | Phiên bản | Mô tả                                        |
| --------------------------------------------------------------- | --------- | -------------------------------------------- |
| [NestJS](https://nestjs.com/)                                   | ^11.0.1   | Framework Node.js theo kiến trúc module      |
| [MongoDB](https://www.mongodb.com/)                             | —         | Cơ sở dữ liệu NoSQL document-oriented        |
| [Mongoose](https://mongoosejs.com/)                             | ^9.2.3    | ODM để tương tác với MongoDB                 |
| [@nestjs/mongoose](https://docs.nestjs.com/techniques/mongodb)  | ^11.0.4   | Tích hợp Mongoose vào NestJS                 |
| [@nestjs/swagger](https://docs.nestjs.com/openapi/introduction) | ^11.2.6   | Tự động sinh tài liệu API (OpenAPI/Swagger)  |
| [TypeScript](https://www.typescriptlang.org/)                   | ^5.7.3    | Ngôn ngữ lập trình có kiểu tĩnh              |
| [SWC](https://swc.rs/)                                          | ^1.15.17  | Compiler siêu nhanh thay thế ts-node khi dev |
| [RxJS](https://rxjs.dev/)                                       | ^7.8.1    | Lập trình reactive                           |
| [Jest](https://jestjs.io/)                                      | ^30.0.0   | Framework kiểm thử đơn vị                    |

---

## 📁 Cấu trúc thư mục

```
backend/
├── src/
│   ├── app.module.ts            # Module gốc, kết nối tất cả modules
│   ├── app.controller.ts        # Controller gốc
│   ├── app.service.ts           # Service gốc
│   ├── main.ts                  # Điểm khởi chạy ứng dụng
│   │
│   ├── users/                   # Module Người dùng
│   │   ├── users.module.ts
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   ├── users.schema.ts      # Mongoose Schema
│   │   ├── dto/
│   │   │   ├── create-user.dto.ts
│   │   │   └── update-user.dto.ts
│   │   └── entities/
│   │       └── user.entity.ts
│   │
│   ├── departments/             # Module Phòng ban (cần tạo)
│   ├── roles/                   # Module Vai trò & Phân quyền (cần tạo)
│   ├── request-types/           # Module Loại đơn từ (cần tạo)
│   ├── requests/                # Module Đơn từ chính (cần tạo)
│   ├── approval-steps/          # Module Luồng phê duyệt (cần tạo)
│   ├── leave-balances/          # Module Số dư ngày nghỉ (cần tạo)
│   └── attachments/             # Module File đính kèm (cần tạo)
│
├── test/                        # E2E tests
├── public/                      # Static files
├── .env                         # Biến môi trường (không commit)
├── .env.example                 # Mẫu biến môi trường
├── nest-cli.json
├── tsconfig.json
└── package.json
```

## CÁC NHÓM VAI TRÒ TRONG HỆ THỐNG

Hệ thống phân loại vai trò theo mô hình **RBAC (Role-Based Access Control)** với 4 cấp độ chính:

### 1. **Employee** (Nhân viên - Người tạo đơn)

Đây là vai trò cơ bản nhất. Hầu hết mọi người trong công ty đều giữ role này.

**Quyền hạn:**

- Tạo mới các loại đơn (Nghỉ phép, OT, Công tác...).
- Xem lịch sử đơn cá nhân và theo dõi trạng thái phê duyệt (Pending/Approved).
- Hủy đơn (nếu chưa được duyệt).
- Quản lý số dư ngày nghỉ của bản thân (Leave Balance).

**Đặc điểm:** Chỉ nhìn thấy dữ liệu của chính mình.

---

### 2. **Line Manager** (Quản lý trực tiếp)

Đây là "mắt xích" quan trọng nhất trong quy trình phê duyệt (Approval Flow).

**Quyền hạn:**

- Nhận thông báo và phê duyệt/từ chối đơn của nhân viên cấp dưới (dựa trên `manager_id`).
- Xem lịch làm việc/nghỉ phép của cả team để sắp xếp nhân sự phù hợp.
- Được quyền yêu cầu nhân viên bổ sung thêm minh chứng (Comments/Attachments).

**Đặc điểm:** Tầm nhìn giới hạn trong bộ phận hoặc nhóm mình quản lý.

---

### 3. **HR Admin** (Quản trị nhân sự)

HR không chỉ duyệt đơn mà còn là người thiết lập "luật chơi".

**Quyền hạn:**

- **Quản lý danh mục:** Tạo mới các loại đơn (RequestTypes) và định nghĩa quy trình (ApprovalTemplates).
- **Điều chỉnh số dư:** Cộng/trừ ngày nghỉ phép năm cho nhân viên.
- **Báo cáo:** Xuất dữ liệu ra Excel để tính lương (Payroll) hoặc kiểm tra chuyên cần.
- **Duyệt cấp cuối:** Thường là bước cuối cùng trong các đơn liên quan đến tài chính hoặc nghỉ dài ngày.

**Đặc điểm:** Có quyền can thiệp vào dữ liệu đơn từ của toàn bộ nhân viên nhưng không thay đổi được cấu hình hệ thống sâu.

---

### 4. **System Admin** (Quản trị hệ thống - IT)

Người giữ "chìa khóa" kỹ thuật của hệ thống.

**Quyền hạn:**

- Quản lý danh sách người dùng, khởi tạo tài khoản.
- Phân quyền Role & Permissions cho từng tài khoản.
- Cấu hình các tham số kỹ thuật (Mail server, kết nối MongoDB, Logs).
- Khôi phục dữ liệu hoặc xử lý lỗi logic.

**Đặc điểm:** Thường không tham gia vào luồng duyệt đơn nghiệp vụ, chỉ đảm bảo hệ thống chạy thông suốt.

---

### 📊 Bảng so sánh nhanh quyền hạn

| Tính năng                          | Employee | Manager | HR Admin | System Admin |
| ---------------------------------- | -------- | ------- | -------- | ------------ |
| Tạo đơn cá nhân                    | ✅       | ✅      | ✅       | ❌           |
| Duyệt đơn cấp dưới                 | ❌       | ✅      | ✅       | ❌           |
| Cấu hình Template duyệt            | ❌       | ❌      | ✅       | ❌           |
| Quản lý số dư phép (Toàn công ty)  | ❌       | ❌      | ✅       | ❌           |
| Phân quyền Role (RBAC)             | ❌       | ❌      | ❌       | ✅           |
| Cấu hình hệ thống & Backup dữ liệu | ❌       | ❌      | ❌       | ✅           |

---

## 🗄️ Thiết kế Database (MongoDB Collections)

Link visualize Database [View](https://dbdiagram.io/d/Leave-Request-Management-Database-698d42aabd82f5fce276acfa)

### 1. Nhóm Quản lý Người dùng & Tổ chức

#### 📌 `users` — Người dùng

| Field           | Kiểu     | Mô tả                                         |
| --------------- | -------- | --------------------------------------------- |
| `_id`           | ObjectId | Khóa chính                                    |
| `full_name`     | String   | Họ và tên                                     |
| `email`         | String   | Email đăng nhập (unique)                      |
| `password`      | String   | Mật khẩu đã hash                              |
| `manager_id`    | ObjectId | Tham chiếu tới người quản lý trực tiếp (User) |
| `role_id`       | ObjectId | Tham chiếu tới Role                           |
| `department_id` | ObjectId | Tham chiếu tới Department                     |
| `status`        | String   | `active` \| `inactive`                        |
| `created_at`    | Date     | Thời điểm tạo                                 |

#### 📌 `roles` — Vai trò & Phân quyền

| Field         | Kiểu          | Mô tả                                  |
| ------------- | ------------- | -------------------------------------- |
| `_id`         | ObjectId      | Khóa chính                             |
| `name`        | String        | Tên vai trò (Admin, Manager, Employee) |
| `permissions` | Object (JSON) | Danh sách quyền hạn                    |

#### 📌 `departments` — Phòng ban

| Field        | Kiểu     | Mô tả                            |
| ------------ | -------- | -------------------------------- |
| `_id`        | ObjectId | Khóa chính                       |
| `name`       | String   | Tên phòng ban (HR, IT, Sales...) |
| `code`       | String   | Mã phòng ban (unique)            |
| `manager_id` | ObjectId | Trưởng phòng ban                 |

---

### 2. Nhóm Danh mục Đơn từ

#### 📌 `request_types` — Loại đơn từ

| Field                | Kiểu     | Mô tả                                              |
| -------------------- | -------- | -------------------------------------------------- |
| `_id`                | ObjectId | Khóa chính                                         |
| `name`               | String   | Tên loại đơn (Nghỉ phép, Đi muộn, Làm thêm giờ...) |
| `slug`               | String   | Định danh dạng slug (unique)                       |
| `require_attachment` | Boolean  | Có yêu cầu file đính kèm không                     |
| `auto_approval`      | Boolean  | Tự động duyệt hay cần phê duyệt thủ công           |

---

### 3. Nhóm Nghiệp vụ Chính

#### 📌 `requests` — Đơn từ

| Field                | Kiểu          | Mô tả                                                |
| -------------------- | ------------- | ---------------------------------------------------- |
| `_id`                | ObjectId      | Khóa chính                                           |
| `creator_id`         | ObjectId      | Người tạo đơn                                        |
| `type_id`            | ObjectId      | Loại đơn từ                                          |
| `title`              | String        | Tiêu đề đơn                                          |
| `content`            | String        | Nội dung chi tiết                                    |
| `metadata`           | Object (JSON) | Dữ liệu mở rộng (ngày bắt đầu, kết thúc, số tiền...) |
| `status`             | String        | `pending` \| `approved` \| `rejected` \| `cancelled` |
| `current_step_order` | Number        | Bước phê duyệt hiện tại                              |
| `created_at`         | Date          | Thời điểm tạo                                        |
| `updated_at`         | Date          | Thời điểm cập nhật                                   |

#### 📌 `approval_steps` — Luồng phê duyệt

Mỗi đơn khi được tạo sẽ sinh ra các bước phê duyệt tương ứng theo thứ tự.

| Field         | Kiểu     | Mô tả                                 |
| ------------- | -------- | ------------------------------------- |
| `_id`         | ObjectId | Khóa chính                            |
| `request_id`  | ObjectId | Đơn từ tương ứng                      |
| `approver_id` | ObjectId | Người có quyền duyệt bước này         |
| `step_order`  | Number   | Thứ tự bước (1 → 2 → 3...)            |
| `status`      | String   | `pending` \| `approved` \| `rejected` |
| `comment`     | String   | Ghi chú/lý do khi duyệt hoặc từ chối  |
| `signed_at`   | Date     | Thời điểm xử lý                       |

#### 📌 `leave_balances` — Số dư ngày nghỉ

| Field            | Kiểu     | Mô tả                      |
| ---------------- | -------- | -------------------------- |
| `_id`            | ObjectId | Khóa chính                 |
| `user_id`        | ObjectId | Nhân viên                  |
| `year`           | Number   | Năm áp dụng                |
| `total_days`     | Float    | Tổng số ngày phép được cấp |
| `used_days`      | Float    | Số ngày đã sử dụng         |
| `remaining_days` | Float    | Số ngày còn lại            |

#### 📌 `attachments` — File đính kèm

| Field         | Kiểu     | Mô tả                                           |
| ------------- | -------- | ----------------------------------------------- |
| `_id`         | ObjectId | Khóa chính                                      |
| `request_id`  | ObjectId | Đơn từ liên quan                                |
| `file_url`    | String   | Đường dẫn tới file (hóa đơn, giấy khám bệnh...) |
| `file_type`   | String   | Loại file (pdf, jpg, png...)                    |
| `uploaded_at` | Date     | Thời điểm upload                                |

---

## ⚙️ Cài đặt & Chạy chương trình

### Yêu cầu hệ thống

- **Node.js** >= 18.x
- **npm** >= 9.x
- **MongoDB** >= 6.x (chạy local hoặc dùng MongoDB Atlas)

### Bước 1: Clone và cài dependencies

```bash
git clone <repository-url>
cd backend
npm install
```

### Bước 2: Cấu hình biến môi trường

Tạo file `.env` từ file mẫu:

```bash
cp .env.example .env
```

Chỉnh sửa nội dung file `.env`:

```env
PORT=5050
MONGO_URI=mongodb://localhost:27017/lrm

ACCESS_TOKEN_SECRET=your-access-token-secret
REFRESH_TOKEN_SECRET=your-refresh-token-secret

NODE_ENV=development
```

> **Lưu ý:** Nếu dùng MongoDB Atlas, thay `MONGO_URI` bằng connection string từ Atlas.

### Bước 3: Chạy ứng dụng

```bash
# Chế độ development (hot reload với SWC)
npm run start:dev

# Chế độ production
npm run build
npm run start:prod

# Chế độ debug
npm run start:debug
```

Ứng dụng sẽ chạy tại: `http://localhost:5050`

### Bước 4: Xem tài liệu API (Swagger)

Sau khi khởi động, truy cập:

```
http://localhost:5050/
```

---

## 🧪 Kiểm thử

```bash
# Chạy unit tests
npm run test

# Chạy unit tests với watch mode
npm run test:watch

# Chạy tests với coverage report
npm run test:cov

# Chạy end-to-end tests
npm run test:e2e
```

---

## 📡 API Endpoints (tổng quan)

| Method   | Endpoint                      | Mô tả                            |
| -------- | ----------------------------- | -------------------------------- |
| `POST`   | `/auth/login`                 | Đăng nhập                        |
| `POST`   | `/auth/refresh`               | Làm mới access token             |
| `GET`    | `/users`                      | Lấy danh sách người dùng         |
| `POST`   | `/users`                      | Tạo người dùng mới               |
| `GET`    | `/users/:id`                  | Lấy thông tin người dùng         |
| `PATCH`  | `/users/:id`                  | Cập nhật người dùng              |
| `DELETE` | `/users/:id`                  | Xóa người dùng                   |
| `GET`    | `/departments`                | Lấy danh sách phòng ban          |
| `GET`    | `/request-types`              | Lấy danh sách loại đơn từ        |
| `POST`   | `/requests`                   | Tạo đơn mới                      |
| `GET`    | `/requests`                   | Lấy danh sách đơn                |
| `GET`    | `/requests/:id`               | Xem chi tiết đơn                 |
| `PATCH`  | `/requests/:id/cancel`        | Hủy đơn                          |
| `POST`   | `/approval-steps/:id/approve` | Duyệt một bước                   |
| `POST`   | `/approval-steps/:id/reject`  | Từ chối một bước                 |
| `GET`    | `/leave-balances/me`          | Xem số dư ngày nghỉ của bản thân |

---

## 🔐 Luồng xác thực (Authentication Flow)

1. Người dùng đăng nhập qua `POST /auth/login` → nhận **Access Token** (ngắn hạn) và **Refresh Token** (dài hạn).
2. Mỗi request API cần đính kèm header: `Authorization: Bearer <access_token>`.
3. Khi Access Token hết hạn, gọi `POST /auth/refresh` với Refresh Token để lấy token mới.

---

## 🔄 Luồng phê duyệt đơn (Approval Flow)

```
Nhân viên tạo đơn (status: pending)
        ↓
Hệ thống tự động tạo các ApprovalStep theo thứ tự
        ↓
Người duyệt cấp 1 xem xét → Duyệt hoặc Từ chối
        ↓ (nếu duyệt)
Người duyệt cấp 2 xem xét → Duyệt hoặc Từ chối
        ↓ (nếu tất cả duyệt)
Đơn được cập nhật status: approved
        ↓ (nếu bất kỳ bước nào từ chối)
Đơn được cập nhật status: rejected
```

---

## 👥 Nhóm phát triển

Dự án được phát triển cho **Web AI Hackathon 2026**.

---

## 📄 License

UNLICENSED — Dự án nội bộ, không dành cho phân phối thương mại.
