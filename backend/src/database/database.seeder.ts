import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker/locale/vi';
import { PERMISSIONS_METADATA } from '../enum/permission.enum';
import { PermissionDoc } from '../permission/permission.schema';
import { Role } from '../roles/roles.schema';
import { User } from '../users/users.schema';
import { Department } from 'src/departments/departments.schema';
import { orgStructure } from 'src/config/orgStructure.config';
import { Position } from 'src/positions/positions.schema';
import { FormTemplate } from '../form-template/form-template.schema';
import { formTemplateSeed } from 'src/config/formTemplate.config';
import { Request } from 'src/requests/requests.schema';
import { LeaveBalance } from 'src/leave-balances/leave-balances.schema';
import { Counter } from 'src/counters/counters.schema';

@Injectable()
export class DatabaseSeeder implements OnApplicationBootstrap {
  private readonly logger = new Logger(DatabaseSeeder.name);

  constructor(
    @InjectModel(PermissionDoc.name)
    private readonly permissionModel: Model<PermissionDoc>,
    @InjectModel(Role.name) private readonly roleModel: Model<Role>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Counter.name) private readonly counterModel: Model<Counter>,
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
    const [managerRole, hrRole] = await Promise.all([
      this.roleModel.findOne({ name: 'MANAGER' }).select('_id').lean(),
      this.roleModel.findOne({ name: 'HR' }).select('_id').lean(),
    ]);

    if (!managerRole?._id || !hrRole?._id) {
      this.logger.warn('Thiếu role MANAGER/HR, bỏ qua seed key leaders');
      return;
    }

    const level8LeaderConfigs = orgStructure
      .flatMap((department) =>
        department.positions
          .filter((position) => position.level === 8)
          .map((position) => ({
            code: position.name,
            departmentCode: department.code,
            positionName: position.name,
            role: department.code === 'HR' ? 'HR' : 'MANAGER',
          })),
      )
      .sort((a, b) =>
        `${a.departmentCode}-${a.positionName}`.localeCompare(
          `${b.departmentCode}-${b.positionName}`,
        ),
      );

    for (const config of level8LeaderConfigs) {
      const [department, position] = await Promise.all([
        this.departmentModel
          .findOne({ code: config.departmentCode })
          .select('_id')
          .lean(),
        this.positionModel
          .findOne({ name: config.positionName })
          .select('_id')
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
        const updatedFields: Record<string, unknown> = {
          roleId,
          departmentId: String(department._id),
          positionId: String(position._id),
          managerId: null,
        };

        if (!this.isValidEmployeeId(existing.empId)) {
          updatedFields.empId = await this.generateEmployeeId();
        }

        await this.userModel.updateOne(
          { _id: existing._id },
          {
            $set: updatedFields,
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
        empId: await this.generateEmployeeId(),
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

  private isValidEmployeeId(empId?: string): boolean {
    return !!empId && /^\d{8}$/.test(empId);
  }

  private async generateEmployeeId(): Promise<string> {
    const currentYear = new Date().getFullYear().toString().slice(-2);
    const prefix = `${currentYear}${currentYear}`;

    const counter = await this.counterModel.findOneAndUpdate(
      { _id: prefix },
      { $inc: { seq: 1 } },
      { upsert: true, new: true },
    );

    const sequence = counter.seq.toString().padStart(4, '0');
    return `${prefix}${sequence}`;
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

    await this.roleModel.updateOne(
      { name: 'ADMIN' },
      { permissions: allPermissions.map((p) => p._id) },
      { upsert: true },
    );

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

    const hrPerms = allPermissions.filter(
      (p) =>
        p.code.includes('OWN') ||
        p.code === 'CREATE_LEAVE' ||
        p.code === 'VIEW_REPORT' ||
        p.code === 'READ_ALL_LEAVE' ||
        p.code === 'MANAGE_LEAVE_TYPES' ||
        p.code === 'ASSIGN_MANAGER',
    );
    await this.roleModel.updateOne(
      { name: 'HR' },
      { permissions: hrPerms.map((p) => p._id) },
      { upsert: true },
    );

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

  async createDefaultDepartmentsAndPositions() {
    for (const item of orgStructure) {
      const dept = await this.departmentModel.findOneAndUpdate(
        { code: item.code },
        { name: item.name, originName: item.originName, code: item.code },
        { upsert: true, returnDocument: 'after' },
      );

      for (const pos of item.positions) {
        await this.positionModel.updateOne(
          { name: pos.name },
          { $set: { ...pos, departmentId: dept._id.toString() } },
          { upsert: true },
        );
      }
    }

    return { message: 'Seeding Departments & Positions hoàn tất!' };
  }
}
