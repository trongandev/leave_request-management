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
  ) {}

  // Hàm này tự động chạy khi ứng dụng khởi chạy xong
  async onApplicationBootstrap() {
    console.log('--- Bắt đầu Seeding dữ liệu ---');
    await this.seedPermissions();
    await this.createDefaultDepartmentsAndPositions();
    await this.seedRoles();
    await this.seedAdminUser();
    await this.seedFormTemplates();
    console.log('--- Seeding hoàn tất ---');
  }

  private async seedFormTemplates() {
    const admin = await this.userModel
      .findOne({ email: 'admin@lrm.com' })
      .exec();

    if (!admin) {
      this.logger.warn('Khong tim thay admin user, bo qua seed form template');
      return;
    }

    const allFields = [
      {
        id: 'text_mdg3fnsg',
        type: 'text',
        label: 'Lý do nghỉ',
        placeholder: '',
        required: false,
        readOnly: false,
        order: 0,
        parentId: null,
        layout: {
          direction: 'col',
        },
      },
      {
        id: 'number_nt54khps',
        type: 'number',
        label: 'New number',
        placeholder: '',
        required: false,
        readOnly: false,
        order: 1,
        parentId: null,
        layout: {
          direction: 'col',
        },
      },
      {
        id: 'checkbox_5yw0fp73',
        type: 'checkbox',
        label: 'New checkbox',
        placeholder: '',
        required: false,
        readOnly: false,
        options: [
          {
            label: 'Option 1',
            value: 'opt_1775017323620',
          },
          {
            label: 'Option 2',
            value: 'opt_1775017323781',
          },
          {
            label: 'Option 3',
            value: 'opt_1775017323934',
          },
        ],
        order: 2,
        parentId: null,
        layout: {
          direction: 'col',
        },
      },
      {
        id: 'radio_luqeb6f6',
        type: 'radio',
        label: 'New radio',
        placeholder: '',
        required: false,
        readOnly: false,
        options: [
          {
            label: 'Option 1',
            value: 'opt_1',
          },
          {
            label: 'Option 2',
            value: 'opt_1775017325356',
          },
          {
            label: 'Option 3',
            value: 'opt_1775017325509',
          },
          {
            label: 'Option 4',
            value: 'opt_1775017325656',
          },
        ],
        order: 3,
        parentId: null,
        layout: {
          direction: 'col',
        },
      },
      {
        id: 'select_zuliexbo',
        type: 'select',
        label: 'New select',
        placeholder: '',
        required: false,
        readOnly: false,
        options: [
          {
            label: 'Option 1',
            value: 'opt_1',
          },
          {
            label: 'Option 2',
            value: 'opt_1775017327429',
          },
          {
            label: 'Option 3',
            value: 'opt_1775017327589',
          },
        ],
        order: 4,
        parentId: null,
        layout: {
          direction: 'col',
        },
      },
      {
        id: 'container_khc8blpv',
        type: 'container',
        label: '',
        placeholder: '',
        required: false,
        readOnly: false,
        order: 1,
        parentId: null,
        layout: {
          direction: 'row',
        },
      },
      {
        id: 'file_jqqb7pjw',
        type: 'file',
        label: 'Đính kèm tệp',
        placeholder: '',
        required: false,
        readOnly: false,
        order: 2,
        parentId: null,
        layout: {
          direction: 'col',
        },
      },
      {
        id: 'date_xdvtg807',
        type: 'date',
        label: 'Từ ngày:',
        placeholder: '',
        required: false,
        readOnly: false,
        order: 3,
        parentId: 'container_khc8blpv',
        layout: {
          direction: 'col',
        },
      },
      {
        id: 'date_fbws9zgs',
        type: 'date',
        label: 'Đến ngày:',
        placeholder: '',
        required: false,
        readOnly: false,
        order: 4,
        parentId: 'container_khc8blpv',
        layout: {
          direction: 'col',
        },
      },
    ];
    const minimumFieldTemplate = [
      {
        id: 'text_mdg3fnsg',
        type: 'text',
        label: 'Lý do nghỉ',
        placeholder: '',
        required: false,
        readOnly: false,
        order: 0,
        parentId: null,
        layout: {
          direction: 'col',
        },
      },
      {
        id: 'container_khc8blpv',
        type: 'container',
        label: '',
        placeholder: '',
        required: false,
        readOnly: false,
        order: 1,
        parentId: null,
        layout: {
          direction: 'row',
        },
      },
      {
        id: 'file_jqqb7pjw',
        type: 'file',
        label: 'Đính kèm tệp',
        placeholder: '',
        required: false,
        readOnly: false,
        order: 2,
        parentId: null,
        layout: {
          direction: 'col',
        },
      },
      {
        id: 'date_xdvtg807',
        type: 'date',
        label: 'Từ ngày:',
        placeholder: '',
        required: false,
        readOnly: false,
        order: 3,
        parentId: 'container_khc8blpv',
        layout: {
          direction: 'col',
        },
      },
      {
        id: 'date_fbws9zgs',
        type: 'date',
        label: 'Đến ngày:',
        placeholder: '',
        required: false,
        readOnly: false,
        order: 4,
        parentId: 'container_khc8blpv',
        layout: {
          direction: 'col',
        },
      },
    ];
    const formTemplates = [
      {
        code: 'ANNUAL_LEAVE',
        vieName: 'Đơn Xin Nghỉ Phép Năm',
        engName: 'Annual Leave Application Form',
        fields: minimumFieldTemplate,
        version: 1,
        isActive: true,
        submitButtonText: 'Gửi yêu cầu',
        autoApprove: false,
        maxDays: 12,
        requireAttachment: false,
        isReductible: true,
      },
      {
        code: 'SICK_LEAVE',
        vieName: 'Đơn Xin Nghỉ Bệnh',
        engName: 'Sick Leave Application Form',
        fields: minimumFieldTemplate,
        version: 1,
        isActive: true,
        submitButtonText: 'Gửi yêu cầu',
        autoApprove: false,
        maxDays: 30,
        requireAttachment: true,
        isReductible: false,
      },
      {
        code: 'MARRIAGE_LEAVE',
        vieName: 'Đơn Xin Nghỉ Kết Hôn',
        engName: 'Marriage Leave Application Form',
        fields: minimumFieldTemplate,
        version: 1,
        isActive: true,
        submitButtonText: 'Gửi yêu cầu',
        autoApprove: false,
        maxDays: 3,
        requireAttachment: false,
        isReductible: false,
      },
      {
        code: 'BEREAVEMENT_CLOSE_FAMILY_LEAVE',
        vieName: 'Đơn Xin Nghỉ Tang Chế (Gia Đình Gần)',
        engName: 'Close Family Bereavement Leave Form',
        fields: minimumFieldTemplate,
        version: 1,
        isActive: true,
        submitButtonText: 'Gửi yêu cầu',
        autoApprove: false,
        maxDays: 3,
        requireAttachment: false,
        isReductible: false,
      },
      {
        code: 'BEREAVEMENT_EXTENDED_FAMILY_LEAVE',
        vieName: 'Đơn Xin Nghỉ Tang Chế (Gia Đình Gần)',
        engName: 'Extended Family Bereavement Leave Form',
        fields: minimumFieldTemplate,
        version: 1,
        isActive: true,
        submitButtonText: 'Gửi yêu cầu',
        autoApprove: false,
        maxDays: 1,
        requireAttachment: false,
        isReductible: false,
      },
      {
        code: 'TEMPLATE_FORM',
        vieName: 'Đơn Xin Nghỉ',
        engName: 'Leave Form',
        fields: allFields,
        version: 1,
        isActive: true,
        submitButtonText: 'Gửi yêu cầu',
        autoApprove: false,
        maxDays: 1,
        requireAttachment: false,
        isReductible: false,
      },
    ];

    for (const template of formTemplates) {
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
