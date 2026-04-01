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
import { RequestType } from '../request-type/request-type.schema';

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
    @InjectModel(RequestType.name)
    private readonly requestTypeModel: Model<RequestType>,
  ) {}

  // Hàm này tự động chạy khi ứng dụng khởi chạy xong
  async onApplicationBootstrap() {
    console.log('--- Bắt đầu Seeding dữ liệu ---');
    await this.seedPermissions();
    await this.createDefaultDepartmentsAndPositions();
    await this.seedRoles();
    await this.seedAdminUser();
    await this.seedLeaveType();
    console.log('--- Seeding hoàn tất ---');
  }

  private async seedLeaveType() {
    await this.requestTypeModel.deleteMany({
      code: { $in: ['PAID_SPECIAL_LEAVE'] },
    });

    const requestTypes: Array<{
      req_typeId: number;
      name: string;
      code: string;
      desc: string;
      isDeductible: boolean;
      requireAttachment: boolean;
      maxDays: number;
      autoApproval: boolean;
    }> = [
      {
        req_typeId: 1,
        name: 'Nghỉ phép năm',
        code: 'ANNUAL_LEAVE',
        desc: 'Trừ vào số dư 12 ngày phép năm.',
        isDeductible: true,
        requireAttachment: false,
        maxDays: 12,
        autoApproval: false,
      },
      {
        req_typeId: 2,
        name: 'Nghỉ bệnh',
        code: 'SICK_LEAVE',
        desc: 'Không trừ phép năm, cần giấy xác nhận bệnh viện (BHXH chi trả).',
        isDeductible: false,
        requireAttachment: true,
        maxDays: 30,
        autoApproval: false,
      },
      {
        req_typeId: 3,
        name: 'Nghỉ kết hôn',
        code: 'MARRIAGE_LEAVE',
        desc: 'Nghỉ kết hôn, được nghỉ tối đa 3 ngày và không trừ phép năm.',
        isDeductible: false,
        requireAttachment: false,
        maxDays: 3,
        autoApproval: false,
      },
      {
        req_typeId: 4,
        name: 'Nghỉ tang chế (bố mẹ, vợ/chồng, con cái)',
        code: 'BEREAVEMENT_CLOSE_FAMILY_LEAVE',
        desc: 'Nghỉ tang chế khi bố mẹ, vợ/chồng hoặc con cái mất, tối đa 3 ngày và không trừ phép năm.',
        isDeductible: false,
        requireAttachment: false,
        maxDays: 3,
        autoApproval: false,
      },
      {
        req_typeId: 5,
        name: 'Nghỉ tang chế (ông bà, anh chị em ruột)',
        code: 'BEREAVEMENT_EXTENDED_FAMILY_LEAVE',
        desc: 'Nghỉ tang chế khi ông bà hoặc anh chị em ruột mất, tối đa 1 ngày và không trừ phép năm.',
        isDeductible: false,
        requireAttachment: false,
        maxDays: 1,
        autoApproval: false,
      },
      {
        req_typeId: 6,
        name: 'Nghỉ không lương',
        code: 'UNPAID_LEAVE',
        desc: 'Không giới hạn nhưng cần phê duyệt gắt gao.',
        isDeductible: false,
        requireAttachment: false,
        maxDays: 365,
        autoApproval: false,
      },
      {
        req_typeId: 7,
        name: 'Đơn khác',
        code: 'OTHER_LEAVE',
        desc: 'Không giới hạn nhưng cần phê duyệt gắt gao.',
        isDeductible: false,
        requireAttachment: false,
        maxDays: 365,
        autoApproval: false,
      },
    ];

    const managedCodes = requestTypes.map((item) => item.code);

    // Move existing managed records to a temporary id range first.
    // This prevents unique index collisions when remapping req_typeId values.
    const existingManaged = await this.requestTypeModel
      .find({ code: { $in: managedCodes } })
      .select('_id req_typeId')
      .lean<Array<{ _id: unknown; req_typeId?: number }>>()
      .exec();

    for (const doc of existingManaged) {
      if (typeof doc.req_typeId === 'number') {
        await this.requestTypeModel.updateOne(
          { _id: doc._id },
          { $set: { req_typeId: doc.req_typeId + 1000 } },
        );
      }
    }

    for (const item of requestTypes) {
      await this.requestTypeModel.updateOne(
        { code: item.code },
        {
          $set: {
            req_typeId: item.req_typeId,
            name: item.name,
            code: item.code,
            desc: item.desc,
            isDeductible: item.isDeductible,
            requireAttachment: item.requireAttachment,
            maxDays: item.maxDays,
            autoApproval: item.autoApproval,
          },
        },
        { upsert: true },
      );
    }

    this.logger.log('Da seed request types mac dinh');
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
