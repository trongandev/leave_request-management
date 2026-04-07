import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PERMISSIONS_METADATA } from '../enum/permission.enum';
import { PermissionDoc } from '../permission/permission.schema';
import { Role } from '../roles/roles.schema';
import { User } from '../users/users.schema';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker/locale/vi';
import { Department } from 'src/departments/departments.schema';
import { orgStructure } from 'src/config/orgStructure.config';
import { Position } from 'src/positions/positions.schema';
import { FormTemplate } from '../form-template/form-template.schema';
import { formTemplateSeed } from 'src/config/formTemplate.config';
import { Request } from 'src/requests/requests.schema';
import { LeaveBalance } from 'src/leave-balances/leave-balances.schema';
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
    @InjectModel(LeaveBalance.name)
    private readonly leaveBalanceModel: Model<LeaveBalance>,
  ) {}

  // Hàm này tự động chạy khi ứng dụng khởi chạy xong
  async onApplicationBootstrap() {
    console.log('--- Bắt đầu Seeding dữ liệu ---');
    await this.seedPermissions();
    await this.createDefaultDepartmentsAndPositions();
    await this.seedRoles();
    await this.seedAdminUser();
    await this.seedKeyLeaders();
    await this.seedFormTemplates();
    console.log('--- Seeding hoàn tất ---');
  }

  private async seedKeyLeaders() {
    await this.ensureStrategicPositions();

    const [managerRole, hrRole] = await Promise.all([
      this.roleModel.findOne({ name: 'MANAGER' }).select('_id').lean(),
      this.roleModel.findOne({ name: 'HR' }).select('_id').lean(),
    ]);

    if (!managerRole?._id || !hrRole?._id) {
      this.logger.warn('Thiếu role MANAGER/HR, bỏ qua seed key leaders');
      return;
    }

    const keyLeaderConfigs = [
      {
        code: 'CTO',
        departmentCode: 'TECH',
        positionName: 'CTO',
        role: 'MANAGER',
      },
      {
        code: 'CFO',
        departmentCode: 'SYS',
        positionName: 'CFO',
        role: 'MANAGER',
      },
      {
        code: 'FM',
        departmentCode: 'PROD',
        positionName: 'FM',
        role: 'MANAGER',
      },
      { code: 'HRD', departmentCode: 'HR', positionName: 'HRD', role: 'HR' },
      {
        code: 'RDM',
        departmentCode: 'RND',
        positionName: 'RDM',
        role: 'MANAGER',
      },
      {
        code: 'DLM',
        departmentCode: 'LOG',
        positionName: 'LM',
        role: 'MANAGER',
      },
      {
        code: 'QAD',
        departmentCode: 'QA',
        positionName: 'QAM',
        role: 'MANAGER',
      },
      {
        code: 'SM',
        departmentCode: 'SYS',
        positionName: 'SM',
        role: 'MANAGER',
      },
    ] as const;

    for (const config of keyLeaderConfigs) {
      const [department, position] = await Promise.all([
        this.departmentModel
          .findOne({ code: config.departmentCode })
          .select('_id')
          .lean(),
        this.positionModel
          .findOne({ name: config.positionName })
          .select('_id departmentId')
          .lean(),
      ]);

      if (!department?._id || !position?._id) {
        this.logger.warn(
          `Không tìm thấy department/position cho key leader ${config.code}`,
        );
        continue;
      }

      const roleId =
        config.role === 'HR' ? String(hrRole._id) : String(managerRole._id);
      const email = `${config.code.toLowerCase()}@lrm.com`;

      const existing = await this.userModel.findOne({ email }).exec();
      if (existing) {
        await this.userModel.updateOne(
          { _id: existing._id },
          {
            $set: {
              roleId,
              departmentId: String(department._id),
              positionId: String(position._id),
              managerId: null,
            },
          },
        );
        continue;
      }

      const hashedPassword = await bcrypt.hash('Leader@123', 10);
      const birthDate = faker.date.birthdate({
        min: 1975,
        max: 1992,
        mode: 'year',
      });

      const createdLeader = await this.userModel.create({
        empId: `LD${faker.string.numeric(6)}`,
        fullName: faker.person.fullName(),
        email,
        phone: faker.helpers.fromRegExp(/0[35789][0-9]{8}/),
        password: hashedPassword,
        roleId,
        departmentId: String(department._id),
        positionId: String(position._id),
        avatar: faker.image.avatar(),
        gender: faker.person.sex(),
        birthDate,
        status: true,
      });

      const currentYear = new Date().getFullYear();
      const baseDays = 12;
      const seniorityDays = 0;
      const adjustedDays = 0;
      const totalDays = baseDays + seniorityDays + adjustedDays;

      await this.leaveBalanceModel.updateOne(
        { userId: String(createdLeader._id), year: currentYear },
        {
          $set: {
            userId: String(createdLeader._id),
            year: currentYear,
            baseDays,
            seniorityDays,
            adjustedDays,
            totalDays,
            usedDays: 0,
            remainingDays: totalDays,
          },
        },
        { upsert: true },
      );
    }
  }

  private async ensureStrategicPositions(): Promise<void> {
    const hrDepartment = await this.departmentModel
      .findOne({ code: 'HR' })
      .select('_id')
      .lean();
    const sysDepartment = await this.departmentModel
      .findOne({ code: 'SYS' })
      .select('_id')
      .lean();

    if (hrDepartment?._id) {
      await this.positionModel.updateOne(
        { name: 'HRD', departmentId: String(hrDepartment._id) },
        {
          $set: {
            name: 'HRD',
            fullName: 'Human Resources Director',
            description: 'Giám đốc nhân sự',
            level: 7,
            departmentId: String(hrDepartment._id),
          },
        },
        { upsert: true },
      );
    }

    if (sysDepartment?._id) {
      await this.positionModel.updateOne(
        { name: 'CFO', departmentId: String(sysDepartment._id) },
        {
          $set: {
            name: 'CFO',
            fullName: 'Chief Financial Officer',
            description: 'Giám đốc tài chính',
            level: 8,
            departmentId: String(sysDepartment._id),
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
        p.code === 'READ_DEPARTMENT_LEAVE' ||
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
        p.code === 'CREATE_LEAVE' ||
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

    const findDept = await this.departmentModel.findOne({ code: 'SYS' });
    if (!findDept) {
      this.logger.warn('Khong tim thay department SYS, bo qua seed admin user');
      return;
    }
    const currentHighestPosition = await this.positionModel
      .findOne({}, { level: 1 })
      .sort({ level: -1 })
      .lean();

    const adminLevel = (currentHighestPosition?.level ?? 0) + 1;
    const adminPosition = await this.positionModel.findOneAndUpdate(
      { name: 'SYS_ADMIN' },
      {
        $set: {
          name: 'SYS_ADMIN',
          fullName: 'System Administrator',
          description: 'Quản trị hệ thống',
          level: adminLevel,
          departmentId: findDept._id.toString(),
        },
      },
      { upsert: true, returnDocument: 'after' },
    );

    const existingAdmin = await this.userModel.findOne({
      email: adminEmail,
    });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('Admin@123', 10);

      const newUser = await this.userModel.create({
        email: adminEmail,
        password: hashedPassword,
        roleId: adminRole._id.toString(),
        departmentId: findDept._id.toString(),
        positionId: adminPosition?._id.toString(),
        fullName: 'System Administrator',
      });

      const baseDays = 12;
      const seniorityDays = 0;
      const adjustedDays = 0;
      const totalDays = baseDays + seniorityDays + adjustedDays;
      const usedDays = 0;
      const remainingDays = totalDays - usedDays;

      await this.leaveBalanceModel.create({
        userId: newUser._id.toString(),
        year: new Date().getFullYear(),
        baseDays,
        seniorityDays,
        adjustedDays,
        totalDays,
        usedDays,
        remainingDays,
      });

      console.log('Đã tạo tài khoản Admin mặc định: admin@lrm.com / Admin@123');
      return;
    }

    if (!existingAdmin.positionId && adminPosition?._id) {
      await this.userModel.updateOne(
        { _id: existingAdmin._id },
        {
          $set: {
            positionId: adminPosition._id.toString(),
            departmentId: findDept._id.toString(),
          },
        },
      );
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
