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
import { removeVietnameseTones } from 'src/common/utils/utils';
import {
  SEED_DEFAULT_PASSWORD,
  sampleAccountSeed,
  type SampleAccountSeed,
} from 'src/config/sampleAccount.config';
import { Request } from 'src/requests/requests.schema';
import { LeaveBalance } from 'src/leave-balances/leave-balances.schema';
import { Counter } from 'src/counters/counters.schema';
import { SystemSetting } from 'src/system-setting/system-setting.schema';

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
    @InjectModel(SystemSetting.name)
    private readonly systemSettingModel: Model<SystemSetting>,
  ) {}

  // Hàm này tự động chạy khi ứng dụng khởi chạy xong
  async onApplicationBootstrap() {
    console.log('--- Bắt đầu Seeding dữ liệu ---');
    await this.seedPermissions();
    await this.createDefaultDepartmentsAndPositions();
    await this.seedRoles();
    await this.seedAdminUser();
    await this.seedSampleAccounts();
    await this.seedFormTemplates();
    console.log('--- Seeding hoàn tất ---');
  }

  private async seedSampleAccounts() {
    // Hash once and reuse for all non-admin sample accounts.
    const defaultSeedPasswordHash = await bcrypt.hash(
      SEED_DEFAULT_PASSWORD,
      10,
    );

    // Resolve only roles required by current sample account config.
    const roleNames = [
      ...new Set(sampleAccountSeed.map((item) => item.roleName)),
    ];

    const roles = await this.roleModel
      .find({ name: { $in: roleNames } })
      .select('_id name')
      .lean<Array<{ _id: string; name: string }>>();

    const roleIdByName = new Map(
      roles.map((role) => [role.name, String(role._id)]),
    );

    // Store successfully processed accounts for manager binding pass.
    const accountsForManagerBinding: SampleAccountSeed[] = [];
    const profileByKey = new Map<
      string,
      {
        fullName: string;
        email: string;
        phone: string;
        avatar: string;
        gender: string;
        birthDate: Date;
      }
    >();
    const joinDateBySeedKey = new Map<string, Date>();

    for (let index = 0; index < sampleAccountSeed.length; index += 1) {
      const seed = sampleAccountSeed[index];
      const profile = this.generateSeedProfile(seed.key);
      const joinedAt = this.resolveJoinedAt(seed, profile.birthDate);
      profileByKey.set(seed.key, profile);
      joinDateBySeedKey.set(seed.key, joinedAt);
      const roleId = roleIdByName.get(seed.roleName);

      if (!roleId) {
        this.logger.warn(
          `Không tìm thấy role ${seed.roleName} cho seed key ${seed.key}`,
        );
        continue;
      }

      const [department, position] = await Promise.all([
        // Resolve mapping IDs from config codes/names.
        this.departmentModel
          .findOne({ code: seed.departmentCode })
          .select('_id')
          .lean<{ _id?: string }>(),
        this.positionModel
          .findOne({ name: seed.positionName })
          .select('_id')
          .lean<{ _id?: string }>(),
      ]);

      if (!department?._id || !position?._id) {
        this.logger.warn(
          `Không tìm thấy department/position cho seed key ${seed.key}`,
        );
        continue;
      }

      const existing = await this.userModel.findOne({ email: profile.email });

      if (existing) {
        // Update mandatory auth/org fields and preserve existing randomized profile unless missing.
        const updatedFields: Record<string, unknown> = {
          fullName: profile.fullName,
          email: profile.email,
          password: defaultSeedPasswordHash,
          roleId,
          departmentId: department._id,
          positionId: position._id,
          status: true,
        };

        if (!this.isValidEmployeeId(existing.empId)) {
          updatedFields.empId = await this.generateEmployeeId();
        }

        updatedFields.phone = profile.phone;
        updatedFields.avatar = profile.avatar;
        updatedFields.gender = profile.gender;
        updatedFields.birthDate = profile.birthDate;

        await this.userModel.updateOne(
          { _id: existing._id },
          {
            $set: updatedFields,
          },
        );
      } else {
        // Create new user with profile generated by fake-user algorithm.

        await this.userModel.create({
          empId: await this.generateEmployeeId(),
          fullName: profile.fullName,
          email: profile.email,
          phone: profile.phone,
          password: defaultSeedPasswordHash,
          roleId,
          departmentId: department._id,
          positionId: position._id,
          avatar: profile.avatar,
          gender: profile.gender,
          birthDate: profile.birthDate,
          status: true,
        });
      }

      accountsForManagerBinding.push(seed);
    }

    // Re-load IDs to apply manager links by email after all upserts are done.
    const refreshedUsers = await this.userModel
      .find({
        email: {
          $in: accountsForManagerBinding
            .map((seed) => profileByKey.get(seed.key)?.email)
            .filter((email): email is string => Boolean(email)),
        },
      })
      .select('_id email')
      .lean<Array<{ _id: string; email: string }>>();

    const userIdBySeedKey = new Map(
      accountsForManagerBinding
        .map((seed) => {
          const profile = profileByKey.get(seed.key);
          if (!profile) {
            return null;
          }

          const user = refreshedUsers.find(
            (item) => item.email === profile.email,
          );
          return user ? [seed.key, String(user._id)] : null;
        })
        .filter((item): item is [string, string] => Array.isArray(item)),
    );

    for (const seed of accountsForManagerBinding) {
      const profile = profileByKey.get(seed.key);
      if (!profile) {
        continue;
      }

      if (!seed.managerKey) {
        // Root approvers/managers have no direct manager.
        await this.userModel.updateOne(
          { email: profile.email },
          { $set: { managerId: null } },
        );
        continue;
      }

      const managerId = userIdBySeedKey.get(seed.managerKey);
      if (!managerId) {
        this.logger.warn(
          `Không tìm thấy manager key ${seed.managerKey} cho ${seed.key}`,
        );
        continue;
      }

      await this.userModel.updateOne(
        { email: profile.email },
        { $set: { managerId } },
      );
    }

    const currentYear = new Date().getFullYear();
    const leaveBasePerYear = await this.getLeaveBasePerYear();

    // Ensure each seeded account has current-year leave balance from policy formula.
    for (const [seedKey, userId] of userIdBySeedKey) {
      const seed = accountsForManagerBinding.find(
        (item) => item.key === seedKey,
      );
      const joinedAt = joinDateBySeedKey.get(seedKey) ?? new Date();
      const adjustedDays = Number(seed?.adjustedDays ?? 0);
      const usedDays = this.toNonNegative(Number(seed?.usedDays ?? 0));

      const baseDays = this.getProratedBaseDays(
        leaveBasePerYear,
        joinedAt,
        currentYear,
      );
      const seniorityDays = this.getSeniorityDays(joinedAt, currentYear);
      const totalDays = this.toNonNegative(
        baseDays + seniorityDays + adjustedDays,
      );
      const remainingDays = this.toNonNegative(totalDays - usedDays);

      await this.leaveBalanceModel.updateOne(
        { userId, year: currentYear },
        {
          $set: {
            userId,
            year: currentYear,
            baseDays,
            seniorityDays,
            adjustedDays,
            totalDays,
            usedDays,
            remainingDays,
          },
        },
        { upsert: true },
      );
    }
  }

  private async getLeaveBasePerYear(): Promise<number> {
    const setting = await this.systemSettingModel
      .findOne({ key: 'LEAVE_BASE_PER_YEAR' })
      .select('value')
      .lean<{ value?: unknown }>();

    const parsed = Number(setting?.value ?? 12);
    return Number.isFinite(parsed) ? parsed : 12;
  }

  private getProratedBaseDays(
    basePerYear: number,
    joinedAt: Date,
    targetYear: number,
  ): number {
    const joinMonth = joinedAt.getMonth() + 1;
    const joinYear = joinedAt.getFullYear();

    if (targetYear === joinYear) {
      const prorated = (basePerYear / 12) * (12 - joinMonth + 1);
      return Number(prorated.toFixed(2));
    }

    return Number(basePerYear.toFixed(2));
  }

  private getSeniorityDays(joinedAt: Date, targetYear: number): number {
    const yearsOfService = Math.max(0, targetYear - joinedAt.getFullYear());
    return Math.floor(yearsOfService / 5);
  }

  private toNonNegative(value: number): number {
    return Math.max(0, Number(value.toFixed(2)));
  }

  private resolveJoinedAt(seed: SampleAccountSeed, birthDate: Date): Date {
    if (seed.joinedAt) {
      return new Date(seed.joinedAt);
    }

    const earliestJoinDate = new Date(birthDate);
    earliestJoinDate.setFullYear(earliestJoinDate.getFullYear() + 22);

    const currentYear = new Date().getFullYear();
    const seededJoinDate = faker.date.between({
      from: earliestJoinDate,
      to: new Date(currentYear - 1, 11, 31),
    });

    return new Date(seededJoinDate);
  }

  private generateSeedProfile(seedKey: string): {
    fullName: string;
    email: string;
    phone: string;
    avatar: string;
    gender: string;
    birthDate: Date;
  } {
    faker.seed(this.seedKeyToNumber(seedKey));

    const fullName = faker.person.fullName();
    const nameParts = removeVietnameseTones(fullName)
      .toLowerCase()
      .split(' ')
      .filter(Boolean);

    // Fisher-Yates shuffle (same approach as fake-user generation).
    for (let i = nameParts.length - 1; i > 0; i -= 1) {
      const j = faker.number.int({ min: 0, max: i });
      [nameParts[i], nameParts[j]] = [nameParts[j], nameParts[i]];
    }

    const birthDate = faker.date.birthdate({
      min: 1980,
      max: 2005,
      mode: 'year',
    });
    const birthDateSuffix = new Date(birthDate)
      .getFullYear()
      .toString()
      .slice(-2);
    const insertIndex = faker.number.int({ min: 0, max: nameParts.length });
    nameParts.splice(insertIndex, 0, birthDateSuffix);

    const email = `${nameParts.join('.')}@lrm.com`;

    return {
      fullName,
      email,
      phone: faker.helpers.fromRegExp(/0[35789][0-9]{8}/),
      avatar: faker.image.avatar(),
      gender: faker.person.sex(),
      birthDate: new Date(birthDate),
    };
  }

  private seedKeyToNumber(key: string): number {
    let hash = 0;
    for (let i = 0; i < key.length; i += 1) {
      hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
    }
    return hash;
  }

  private isValidEmployeeId(empId?: string): boolean {
    return !!empId && /^\d{8}$/.test(empId);
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
      this.logger.warn('Không tìm thấy department SYS, bỏ qua seed admin user');
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
      this.logger.warn('Không tìm thấy admin user, bỏ qua seed form template');
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
