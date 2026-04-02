import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PERMISSIONS_METADATA } from '../enum/permission.enum';
import { PermissionDoc } from '../permission/permission.schema';
import { Role } from '../roles/roles.schema';
import { User } from '../users/users.schema';
import * as bcrypt from 'bcrypt';
import { Department } from 'src/departments/departments.schema';
import { orgStructure } from 'src/config/orgStructure.config';
import { Position } from 'src/positions/positions.schema';
import { FormTemplate } from '../form-template/form-template.schema';
import { formTemplateSeed } from 'src/config/formTemplate.config';
import { Request } from 'src/requests/requests.schema';
import { requestsSeed } from 'src/config/requests.config';
@Injectable()
export class DatabaseSeeder implements OnApplicationBootstrap {
  private readonly logger = new Logger(DatabaseSeeder.name);

  constructor(
    @InjectModel(PermissionDoc.name)
    private readonly permissionModel: Model<PermissionDoc>,
    @InjectModel(Role.name) private readonly roleModel: Model<Role>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Position.name) private readonly positionModel: Model<Position>,
    @InjectModel(Department.name)
    private readonly departmentModel: Model<Department>,
    @InjectModel(FormTemplate.name)
    private readonly formTemplateModel: Model<FormTemplate>,
    @InjectModel(Request.name)
    private readonly requestModel: Model<Request>,
  ) {}

  // Hàm này tự động chạy khi ứng dụng khởi chạy xong
  async onApplicationBootstrap() {
    console.log('--- Bắt đầu Seeding dữ liệu ---');
    await this.seedPermissions();
    await this.createDefaultDepartmentsAndPositions();
    await this.seedRoles();
    await this.seedAdminUser();
    await this.seedFormTemplates();
    await this.seedRequests();
    console.log('--- Seeding hoàn tất ---');
  }

  private async seedRequests() {
    for (const request of requestsSeed) {
      const creator = await this.userModel
        .findOne({ email: request.creatorEmail })
        .exec();

      if (!creator) {
        this.logger.warn(
          `Khong tim thay user ${request.creatorEmail}, bo qua seed request ${request.code}`,
        );
        continue;
      }

      const formTemplate = await this.formTemplateModel
        .findOne({ code: request.formTemplateCode })
        .exec();

      if (!formTemplate) {
        this.logger.warn(
          `Khong tim thay form template ${request.formTemplateCode}, bo qua seed request ${request.code}`,
        );
        continue;
      }

      await this.requestModel.updateOne(
        {
          creatorId: creator._id.toString(),
          formTemplateId: formTemplate._id.toString(),
          title: request.title,
        },
        {
          $set: {
            creatorId: creator._id.toString(),
            formTemplateId: formTemplate._id.toString(),
            code: request.code,
            title: request.title,
            values: request.values,
            status: request.status,
            currentStepOrder: request.currentStepOrder,
          },
        },
        { upsert: true },
      );
    }
  }

  private async seedFormTemplates() {
    const admin = await this.userModel
      .findOne({ email: 'admin@lrm.com' })
      .exec();

    if (!admin) {
      this.logger.warn('Khong tim thay admin user, bo qua seed form template');
      return;
    }

    for (const template of formTemplateSeed) {
      await this.formTemplateModel.updateOne(
        { code: template.code },
        {
          $set: {
            ...template,
            userId: admin._id.toString(),
          },
        },
        { upsert: true },
      );
    }
  }

  private async seedPermissions() {
    const operations = PERMISSIONS_METADATA.map((p) => ({
      updateOne: {
        filter: { code: p.code },
        update: { ...p },
        upsert: true,
      },
    }));
    await this.permissionModel.bulkWrite(operations);
    console.log('Đã đồng bộ Permissions');
  }

  private async seedRoles() {
    const allPermissions = await this.permissionModel.find();

    // 1. Role ADMIN: Có tất cả mọi quyền
    await this.roleModel.updateOne(
      { name: 'ADMIN' },
      { permissions: allPermissions.map((p) => p._id) },
      { upsert: true },
    );

    // 2. Role MANAGER: Quyền của nhân viên + Quyền phê duyệt
    const managerPerms = allPermissions.filter(
      (p) =>
        p.code.includes('OWN') ||
        p.code === 'CREATE_LEAVE' ||
        p.code === 'APPROVE_LEAVE' ||
        p.code === 'REJECT_LEAVE' ||
        p.code === 'READ_ALL_LEAVE' ||
        p.code === 'ASSIGN_MANAGER',
    );
    await this.roleModel.updateOne(
      { name: 'MANAGER' },
      { permissions: managerPerms.map((p) => p._id) },
      { upsert: true },
    );

    // 3. Role HR: Quyền của nhân viên + Quyền xem báo cáo + Quản lý loại nghỉ
    const hrPerms = allPermissions.filter(
      (p) =>
        p.code.includes('OWN') ||
        p.code === 'VIEW_REPORT' ||
        p.code === 'READ_ALL_LEAVE' ||
        p.code === 'MANAGE_LEAVE_TYPES' ||
        p.code === 'ASSIGN_MANAGER', // Quyền mới cho HR
    );
    await this.roleModel.updateOne(
      { name: 'HR' },
      { permissions: hrPerms.map((p) => p._id) },
      { upsert: true },
    );

    // 4. Role EMPLOYEE: Chỉ có quyền cá nhân
    const employeePerms = allPermissions.filter(
      (p) => p.code.includes('OWN') || p.code === 'CREATE_LEAVE',
    );
    await this.roleModel.updateOne(
      { name: 'EMPLOYEE' },
      { permissions: employeePerms.map((p) => p._id) },
      { upsert: true },
    );
    console.log('Đã khởi tạo Roles (ADMIN, MANAGER, HR, EMPLOYEE)');
  }

  private async seedAdminUser() {
    const adminRole = await this.roleModel.findOne({ name: 'ADMIN' });
    const adminEmail = 'admin@lrm.com';

    if (!adminRole) {
      console.error('Admin role not found. Cannot create admin user.');
      return;
    }

    const existingAdmin = await this.userModel.findOne({
      email: adminEmail,
    });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('Admin@123', 10);

      const findDept = await this.departmentModel.findOne({ code: 'SYS' });
      await this.userModel.create({
        email: adminEmail,
        password: hashedPassword,
        roleId: adminRole._id.toString(),
        departmentId: findDept?._id.toString() || undefined,
        fullName: 'System Administrator',
      });
      console.log('Đã tạo tài khoản Admin mặc định: admin@lrm.com / Admin@123');
    }
  }

  // tạo danh sách phòng ban mới
  async createDefaultDepartmentsAndPositions() {
    for (const item of orgStructure) {
      // A. Upsert Department
      const dept = await this.departmentModel.findOneAndUpdate(
        { code: item.code },
        { name: item.name, originName: item.originName, code: item.code },
        { upsert: true, returnDocument: 'after' },
      );

      // B. Upsert Positions cho Department đó
      for (const pos of item.positions) {
        await this.positionModel.updateOne(
          { name: pos.name, departmentId: dept._id.toString() }, // Đảm bảo vị trí thuộc đúng phòng
          { $set: { ...pos, departmentId: dept._id.toString() } },
          { upsert: true },
        );
      }
    }

    return { message: 'Seeding Departments & Positions hoàn tất!' };
  }
}
