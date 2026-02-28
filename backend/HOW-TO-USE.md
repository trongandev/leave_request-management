# 📖 HOW TO USE — LRM Backend Core Guide

Tài liệu này hướng dẫn cách sử dụng các thành phần đã được xây dựng sẵn trong backend, dành cho developer khi muốn thêm tính năng mới.

---

## 📋 Mục lục

1. [Tạo Resource CRUD mới](#1-tạo-resource-crud-mới)
2. [Phân quyền cho Endpoint](#2-phân-quyền-cho-endpoint)
3. [Đánh dấu Endpoint Public (không cần JWT)](#3-đánh-dấu-endpoint-public-không-cần-jwt)
4. [Sử dụng CurrentUser Decorator](#4-sử-dụng-currentuser-decorator)
5. [Swagger: ApiOperation, ApiBearerAuth, ApiTags](#5-swagger-apioperation-apibearerauth-apitags)
6. [Pagination](#6-pagination)
7. [Query tối ưu: lean() và exec()](#7-query-tối-ưu-lean-và-exec)
8. [Đọc biến môi trường: process.env vs ConfigService vs DatabaseConfig](#8-đọc-biến-môi-trường-processenv-vs-configservice-vs-databaseconfig)
9. [Database Seeder](#9-database-seeder)
10. [Thêm Permission mới vào hệ thống](#10-thêm-permission-mới-vào-hệ-thống)
11. [TransformInterceptor — Chuẩn hóa response](#11-transforminterceptor--chuẩn-hóa-response)
12. [AllExceptionsFilter — Xử lý lỗi toàn cục](#12-allexceptionsfilter--xử-lý-lỗi-toàn-cục)

---

## 1. Tạo Resource CRUD mới

Dùng NestJS CLI để scaffold toàn bộ file:

```bash
nest g resource <tên-bảng>
# Ví dụ:
nest g resource departments
```

CLI sẽ tạo ra:

```
src/departments/
  ├── departments.module.ts
  ├── departments.controller.ts
  ├── departments.service.ts
  ├── dto/
  │   ├── create-department.dto.ts
  │   └── update-department.dto.ts
  └── entities/
      └── department.entity.ts
```

**Sau đó cần làm thêm:**

### a. Tạo Schema Mongoose (thay thế entity)

```typescript
// src/departments/departments.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Department extends Document {
  @Prop({ required: true })
  @ApiProperty({ example: 'IT Department' })
  name: string;

  @Prop({ required: true, unique: true })
  @ApiProperty({ example: 'IT' })
  code: string;
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);
```

### b. Đăng ký Schema trong Module

```typescript
// src/departments/departments.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Department, DepartmentSchema } from './departments.schema';
import { DepartmentsController } from './departments.controller';
import { DepartmentsService } from './departments.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Department.name, schema: DepartmentSchema },
    ]),
  ],
  controllers: [DepartmentsController],
  providers: [DepartmentsService],
  exports: [DepartmentsService], // Export nếu module khác cần dùng
})
export class DepartmentsModule {}
```

### c. Import vào AppModule

```typescript
// src/app.module.ts
import { DepartmentsModule } from './departments/departments.module';

@Module({
  imports: [
    // ... các module khác
    DepartmentsModule,
  ],
})
export class AppModule {}
```

---

## 2. Phân quyền cho Endpoint

Hệ thống sử dụng `@RequirePermissions()` kết hợp với `PermissionsGuard` (đã đăng ký global).

### Bước 1: Kiểm tra Permission đã tồn tại trong enum chưa

```typescript
// src/enum/permission.enum.ts
export const PERMISSIONS_METADATA = [
  // Nếu chưa có, thêm vào đây:
  {
    code: 'MANAGE_DEPARTMENTS',
    description: 'Quản lý sơ đồ phòng ban',
    module: 'ADMIN',
  },
];
```

### Bước 2: Dùng `@RequirePermissions()` trên endpoint

```typescript
import { RequirePermissions } from 'src/auth/decorators/permissions.decorator';
import { Permission } from 'src/enum/permission.enum';

@Controller('departments')
export class DepartmentsController {
  // Chỉ user có quyền MANAGE_DEPARTMENTS mới được tạo phòng ban
  @Post()
  @RequirePermissions(Permission.MANAGE_DEPARTMENTS)
  @ApiOperation({ summary: 'Tạo phòng ban mới' })
  create(@Body() createDto: CreateDepartmentDto) {
    return this.departmentsService.create(createDto);
  }

  // Tất cả user đã đăng nhập đều đọc được (không cần @RequirePermissions)
  @Get()
  findAll() {
    return this.departmentsService.findAll();
  }
}
```

> **Lưu ý:** `JwtAuthGuard` và `PermissionsGuard` đã được đăng ký global trong `AppModule`. Mọi endpoint **mặc định đều yêu cầu JWT**. Chỉ cần thêm `@RequirePermissions()` khi muốn kiểm tra quyền cụ thể hơn.

---

## 3. Đánh dấu Endpoint Public (không cần JWT)

Dùng `@Public()` cho các endpoint không cần đăng nhập (login, health check...):

```typescript
import { Public } from 'src/auth/decorators/public.decorator';

@Public()
@Get('health')
healthCheck() {
  return { status: 'ok' };
}

@Public()
@Post('login')
login(@Body() loginDto: LoginDto) {
  return this.authService.login(loginDto);
}
```

---

## 4. Sử dụng CurrentUser Decorator

Lấy thông tin user đang đăng nhập từ JWT token (đã được `JwtStrategy` populate sẵn):

```typescript
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { HydratedDocument } from 'mongoose';
import { User } from 'src/users/users.schema';

@Get('me')
getProfile(@CurrentUser() user: HydratedDocument<User>) {
  // user đã có đầy đủ fields: user.fullName, user.email, user.roleId...
  return user;
}

@Post('leave')
createLeave(
  @CurrentUser() user: HydratedDocument<User>,
  @Body() dto: CreateLeaveDto,
) {
  return this.leaveService.create(dto, user._id.toString());
}
```

> **`user.roleId`** là object đã được populate (không phải ObjectId string) vì `JwtStrategy.validate()` đã gọi `.populate('roleId')`.

---

## 5. Swagger: ApiOperation, ApiBearerAuth, ApiTags

### Nhóm endpoints theo tag

```typescript
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Departments') // Hiện ở Swagger UI như 1 nhóm riêng
@Controller('departments')
export class DepartmentsController {}
```

### Mô tả từng endpoint

```typescript
import { ApiOperation } from '@nestjs/swagger';

@Get()
@ApiOperation({
  summary: 'Lấy danh sách phòng ban',          // Tiêu đề ngắn
  description: 'Trả về tất cả phòng ban với phân trang', // Mô tả dài (tuỳ chọn)
})
findAll() {}
```

### Bảo vệ endpoint bằng Bearer Token trên Swagger UI

```typescript
import { ApiBearerAuth } from '@nestjs/swagger';

// Cách 1: Áp dụng cho cả controller
@ApiBearerAuth()
@Controller('departments')
export class DepartmentsController {}

// Cách 2: Áp dụng cho từng endpoint
@ApiBearerAuth()
@Delete(':id')
remove(@Param('id') id: string) {}
```

> **Lưu ý:** `@ApiBearerAuth()` chỉ ảnh hưởng đến UI của Swagger (hiện ổ khóa 🔒). Bảo vệ thực sự là do `JwtAuthGuard`. Nếu endpoint đã global guard thì nhớ thêm `@ApiBearerAuth()` để Swagger UI biết cần token.

---

## 6. Pagination

Dùng helper function `paginate()` có sẵn — không cần viết lại logic skip/limit:

```typescript
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { paginate } from 'src/common/utils/pagination.util';

// Controller
@Get()
@ApiOperation({ summary: 'Lấy danh sách' })
findAll(@Query() paginationDto: PaginationDto) {
  return this.service.findAll(paginationDto);
}

// Service — Cơ bản
async findAll(paginationDto: PaginationDto) {
  return paginate(this.departmentModel, paginationDto);
}

// Service — Có filter
async findAllActive(paginationDto: PaginationDto) {
  return paginate(this.userModel, paginationDto, { status: true });
}

// Service — Có filter + populate + sort
async findAll(paginationDto: PaginationDto) {
  return paginate(
    this.userModel,
    paginationDto,
    { status: true },                          // filter
    { populate: 'roleId', sort: { createdAt: -1 } }, // options
  );
}
```

Response tự động trả về:

```json
{
  "data": [...],
  "meta": {
    "total": 50,
    "page": 1,
    "limit": 10,
    "last_page": 5
  }
}
```

`PaginationDto` tự động validate và có giá trị mặc định `page=1`, `limit=10`.

---

## 7. Query tối ưu: lean() và exec()

### `.lean()` — Dùng khi chỉ cần đọc dữ liệu

```typescript
// ✅ Dùng lean() khi chỉ cần đọc (GET)
// Trả về plain JS object, nhẹ hơn ~3-5x, không có method Mongoose
const users = await this.userModel.find().lean().exec();

// ✅ Dùng lean() cho findOne
const user = await this.userModel.findById(id).lean().exec();
```

### Không dùng `.lean()` — Khi cần thao tác với document

```typescript
// ❌ Không dùng lean() khi cần save(), populate() sau đó
const user = await this.userModel.findById(id).exec();
await user.save(); // ✅ Cần HydratedDocument

const doc = await this.userModel.findById(id).exec();
await doc.populate('roleId'); // ✅ Cần HydratedDocument
```

### `.exec()` — Luôn dùng để rõ ràng và hỗ trợ Promise

```typescript
// ✅ Luôn kết thúc query bằng .exec()
await this.model.find({ status: true }).lean().exec();
await this.model.findById(id).exec();
await this.model.findByIdAndUpdate(id, dto, { new: true }).exec();
```

### Tối ưu query thêm

```typescript
// Chỉ lấy các field cần thiết (projection)
await this.userModel.find().select('fullName email roleId').lean().exec();

// Populate chỉ field cần thiết
await this.userModel.findById(id).populate('roleId', 'name permissions').exec();

// Kết hợp filter + pagination + sort
await this.userModel
  .find({ status: true })
  .sort({ createdAt: -1 }) // Mới nhất trước
  .skip(skip)
  .limit(limit)
  .select('fullName email')
  .lean()
  .exec();
```

---

## 8. Đọc biến môi trường: process.env vs ConfigService vs DatabaseConfig

### Khi nào dùng cái nào?

| Tình huống                                            | Dùng                                      |
| ----------------------------------------------------- | ----------------------------------------- |
| Trong `filter`, `middleware`, code ngoài DI container | `process.env.NODE_ENV`                    |
| Trong `@Injectable()` service/guard/strategy          | `ConfigService` (inject qua constructor)  |
| Cần dùng nhiều config trong 1 service, muốn gọn       | `DatabaseConfig` (inject qua constructor) |

### `process.env` — Dùng ngoài DI container

```typescript
// ✅ Trong filter (không có constructor injection)
const isProduction = process.env.NODE_ENV === 'production';

// ✅ Trong main.ts
await app.listen(process.env.PORT ?? 5050);
```

### `ConfigService` — Inject trực tiếp trong service

```typescript
// ✅ Khi chỉ cần 1-2 config
@Injectable()
export class SomeService {
  constructor(private configService: ConfigService) {}

  doSomething() {
    const secret = this.configService.get<string>('JWT_SECRET');
  }
}
```

### `DatabaseConfig` — Wrapper tiện lợi cho nhiều config

```typescript
// ✅ Khi cần dùng nhiều biến config, code rõ hơn
@Injectable()
export class SomeService {
  constructor(private dbConfig: DatabaseConfig) {}

  doSomething() {
    const secret = this.dbConfig.JWT_SECRET; // Có type, có autocomplete
    const port = this.dbConfig.PORT;
    const env = this.dbConfig.NODE_ENV;
  }
}
```

> **Lưu ý:** Khi dùng `DatabaseConfig` trong một module, phải thêm nó vào `providers` của module đó:
>
> ```typescript
> @Module({
>   providers: [SomeService, DatabaseConfig], // ← cần thêm
> })
> ```
>
> Hoặc đơn giản hơn là chỉ dùng `ConfigService` (đã global).

---

## 9. Database Seeder

`DatabaseSeeder` chạy tự động mỗi lần app khởi động qua `OnApplicationBootstrap`.

### Seeder hiện tại tự động làm:

1. **Sync Permissions** — Đọc từ `permission.enum.ts`, upsert vào DB
2. **Seed Roles** — Tạo/cập nhật 4 roles: `ADMIN`, `MANAGER`, `HR`, `EMPLOYEE`
3. **Seed Admin User** — Tạo tài khoản admin mặc định nếu chưa có

**Tài khoản Admin mặc định:**

```
Email:    admin@lrm.com
Password: Admin@123
```

### Thêm seed data mới

Mở `src/database/database.seeder.ts` và thêm method:

```typescript
async onApplicationBootstrap() {
  await this.seedPermissions();
  await this.seedRoles();
  await this.seedAdminUser();
  await this.seedDepartments(); // ← Thêm vào đây
}

private async seedDepartments() {
  const defaultDepts = ['HR', 'IT', 'Sales', 'Finance'];
  for (const name of defaultDepts) {
    await this.departmentModel.updateOne(
      { code: name },
      { name, code: name },
      { upsert: true },
    );
  }
  console.log('Đã khởi tạo Departments');
}
```

---

## 10. Thêm Permission mới vào hệ thống

**Chỉ cần 2 bước:**

### Bước 1: Thêm vào `permission.enum.ts`

```typescript
// src/enum/permission.enum.ts
export const PERMISSIONS_METADATA = [
  // ... permissions hiện có ...
  {
    code: 'EXPORT_REPORT', // Mã permission (dùng trong code)
    description: 'Xuất báo cáo ra file Excel',
    module: 'REPORT',
  },
];
```

### Bước 2: Dùng trong Controller

```typescript
@Get('export')
@RequirePermissions(Permission.EXPORT_REPORT)
exportReport() { ... }
```

**Seeder sẽ tự động sync permission mới vào DB lần khởi động tiếp theo.** Sau đó Admin có thể gán permission này cho Role thông qua API.

---

## 11. TransformInterceptor — Chuẩn hóa response

Đã được đăng ký global trong `main.ts`. **Không cần làm gì thêm** — mọi response đều tự động được wrap:

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Request successful",
  "data": {
    /* dữ liệu từ controller trả về */
  }
}
```

Chỉ cần return dữ liệu bình thường trong Controller/Service:

```typescript
// ✅ Chỉ cần return thẳng — interceptor sẽ tự wrap
@Get(':id')
findOne(@Param('id') id: string) {
  return this.service.findOne(id); // Interceptor tự bọc vào { data: ... }
}
```

---

## 12. AllExceptionsFilter — Xử lý lỗi toàn cục

Đã đăng ký global qua `APP_FILTER` trong `AppModule`. Tự động:

- Bắt **mọi** loại lỗi (HTTP exception, lỗi DB, lỗi runtime...)
- Ghi log lỗi vào MongoDB collection `errorlogs`
- Ẩn `stack trace` ở môi trường production

**Trong Service, chỉ cần throw exception chuẩn NestJS:**

```typescript
import {
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';

// ✅ Filter sẽ tự bắt và format
throw new NotFoundException('Không tìm thấy phòng ban');
throw new BadRequestException('Dữ liệu không hợp lệ');
throw new ForbiddenException('Bạn không có quyền thực hiện thao tác này');
```

Response lỗi tự động trả về:

```json
{
  "statusCode": 404,
  "timestamp": "2026-02-28T10:00:00.000Z",
  "path": "/departments/999",
  "method": "GET",
  "message": "Không tìm thấy phòng ban"
}
```
