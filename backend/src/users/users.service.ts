import {
  BadRequestException,
  Get,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.schema';
import { Model } from 'mongoose';
import { ApiOperation } from '@nestjs/swagger';
import { paginate } from '../common/utils/pagination.util';
import { Counter } from 'src/counters/counters.schema';
import { Role } from 'src/roles/roles.schema';
import { faker } from '@faker-js/faker/locale/vi';
import { Department } from 'src/departments/departments.schema';
import { Position } from 'src/positions/positions.schema';
import * as bcrypt from 'bcrypt';
import { removeVietnameseTones } from 'src/common/utils/utils';
import { LeaveBalancesService } from '../leave-balances/leave-balances.service';
import { QueryUsersDto } from './dto/query-users.dto';
import { Request } from 'src/requests/requests.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Counter.name) private counterModel: Model<Counter>,
    @InjectModel(Role.name) private roleModel: Model<Role>,
    @InjectModel(Department.name) private departmentModel: Model<Department>,
    @InjectModel(Position.name) private positionModel: Model<Position>,
    @InjectModel(Request.name) private requestModel: Model<Request>,
    private leaveBalancesService: LeaveBalancesService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const findEmail = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (findEmail) {
      throw new Error('Email đã tồn tại');
    }
    const currentYear = new Date().getFullYear().toString().slice(-2); // VD: "26"
    const birthYearSuffix = new Date(createUserDto.birthDate)
      .getFullYear()
      .toString()
      .slice(-2);
    // Tiền tố của mã nhân viên
    const prefix = `${currentYear}${birthYearSuffix}`;
    // Tăng số thứ tự trong DB (Atomic operation)
    const counter = await this.counterModel.findOneAndUpdate(
      { _id: prefix }, // Tìm counter cho riêng nhóm này
      { $inc: { seq: 1 } },
      { upsert: true, new: true },
    );

    // Format số thứ tự thành 4 chữ số (VD: 1 -> "0001")
    const sequence = counter.seq.toString().padStart(4, '0');

    // Kết hợp tạo mã nhân viên cuối cùng
    const finalEmployeeId = `${prefix}${sequence}`;

    // tìm role theo roleId hoặc roleName
    let roleId = createUserDto.roleId;
    if (createUserDto.roleName) {
      const role = await this.roleModel.findOne({
        name: createUserDto.roleName,
      });
      roleId = role ? String(role._id) : createUserDto.roleId;
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
      empId: finalEmployeeId,
      roleId: roleId,
    });

    const saveUser = newUser.save();
    const createdUserId = (await saveUser)._id;
    const populatedUser = await this.userModel
      .findById(createdUserId)
      .populate('roleId')
      .exec();

    // Auto-assign annual leave balance for current year on user creation.
    // If creation fails, log but don't fail the entire user creation transaction.
    try {
      const currentYear = new Date().getFullYear();
      await this.leaveBalancesService.create({
        userId: String(createdUserId),
        year: currentYear,
        adjustedDays: 0,
        usedDays: 0,
      });
    } catch (error) {
      // Log error but don't fail user creation if leave balance creation fails
      console.error('Failed to create leave balance for new user:', error);
    }

    return populatedUser;
  }

  async createFakeUser(count: number = 1) {
    if (count < 1) {
      throw new BadRequestException('Count must be at least 1');
    }
    if (count > 100) {
      throw new BadRequestException('Count must not exceed 100');
    }
    const [departments, roles, allPositions] = await Promise.all([
      this.departmentModel.find(),
      this.roleModel.find(),
      this.positionModel.find(),
    ]);

    if (!departments.length) throw new Error('No departments found');

    const roleMap = new Map(roles.map((r) => [r.name, r]));
    const positionsByDept = new Map<string, Position[]>();

    // Nhóm positions theo departmentId
    allPositions.forEach((pos) => {
      const deptId = String(pos.departmentId);
      if (!positionsByDept.has(deptId)) {
        positionsByDept.set(deptId, []);
      }
      positionsByDept.get(deptId)!.push(pos);
    });

    const usersToCreate: any = [];
    const usedEmails = new Set<string>();
    let emailRetries = 0;

    // Tạo tất cả fake data trước
    for (let i = 0; i < count; i++) {
      const randomDept =
        departments[Math.floor(Math.random() * departments.length)];
      const deptId = String(randomDept._id);
      const positionsForDept = positionsByDept.get(deptId) || [];
      const randomPos =
        positionsForDept.length > 0
          ? positionsForDept[
              Math.floor(Math.random() * positionsForDept.length)
            ]
          : null;

      let fakeData: any;
      let retries = 0;
      // Retry nếu email trùng (tối đa 3 lần)
      do {
        fakeData = this.generateFakeUserData(randomDept, randomPos, roleMap, i);
        retries++;
      } while (usedEmails.has(fakeData.email) && retries < 3);

      if (usedEmails.has(fakeData.email)) {
        emailRetries++;
        console.warn(
          `Failed to generate unique email after ${retries} retries for user ${i + 1}`,
        );
        continue; // Skip user nếu không thể tạo unique email
      }

      usedEmails.add(fakeData.email);
      const hashedPassword = await bcrypt.hash('Password@123', 10);
      const empId = await this.generateEmployeeId();

      usersToCreate.push({
        ...fakeData,
        password: hashedPassword,
        empId,
      });
    }

    // Insert tất cả cùng lúc
    try {
      const created = await this.userModel.insertMany(usersToCreate);

      // Auto-create leave balances cho từng user
      const currentYear = new Date().getFullYear();
      for (const user of created) {
        try {
          await this.leaveBalancesService.create({
            userId: String(user._id),
            year: currentYear,
            adjustedDays: 0,
            usedDays: 0,
          });
        } catch (error) {
          console.error(
            `Failed to create leave balance for user ${user._id}:`,
            error,
          );
        }
      }

      if (emailRetries > 0) {
        console.warn(
          `Skipped ${emailRetries} users due to email collision. Created ${created.length} users.`,
        );
      }

      return created;
    } catch (error) {
      console.error('Batch user creation failed:', error);
      throw error;
    }
  }

  async findUserIdsByDepartment(departmentId: string): Promise<string[]> {
    const users = await this.userModel
      .find({ departmentId })
      .select('_id')
      .lean<Array<{ _id: unknown }>>()
      .exec();

    return users.map((user) => String(user._id));
  }

  private async generateEmployeeId(): Promise<string> {
    const currentYear = new Date().getFullYear().toString().slice(-2);
    const birthYear = new Date().getFullYear().toString().slice(-2); // có thể thay bằng user's birth year nếu cần
    const prefix = `${currentYear}${birthYear}`;

    const counter = await this.counterModel.findOneAndUpdate(
      { _id: prefix },
      { $inc: { seq: 1 } },
      { upsert: true, new: true },
    );

    const sequence = counter.seq.toString().padStart(4, '0');
    return `${prefix}${sequence}`;
  }

  private generateFakeUserData(
    department: Department,
    position: Position | null,
    roleMap: Map<string, Role>,
    index: number,
  ) {
    const roleNames = ['EMPLOYEE', 'MANAGER', 'HR'];
    const roleName = roleNames[index % roleNames.length];
    const role = roleMap.get(roleName) || roleMap.get('EMPLOYEE');
    const positionId = position ? String(position._id) : undefined;

    const fullName = faker.person.fullName();
    const nameParts = removeVietnameseTones(fullName)
      .toLowerCase()
      .split(' ')
      .filter(Boolean);

    // Fisher–Yates shuffle
    for (let i = nameParts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nameParts[i], nameParts[j]] = [nameParts[j], nameParts[i]];
    }

    // Tạo birthDate 1 lần duy nhất
    const birthDate = faker.date.birthdate({
      min: 1980,
      max: 2005,
      mode: 'year',
    });
    const birthDateSuffix = new Date(birthDate)
      .getFullYear()
      .toString()
      .slice(-2);

    // Chèn năm sinh vào vị trí ngẫu nhiên
    const insertIndex = Math.floor(Math.random() * (nameParts.length + 1));
    nameParts.splice(insertIndex, 0, birthDateSuffix);

    const email = `${nameParts.join('.')}@lrm.com`;

    return {
      fullName,
      avatar: faker.image.avatar(),
      gender: faker.person.sex(),
      email,
      phone: faker.helpers.fromRegExp(/0[35789][0-9]{8}/),
      birthDate: new Date(birthDate),
      roleName,
      departmentId: String(department._id),
      positionId,
      roleId: String(role?._id),
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  async findAll(queryUsersDto: QueryUsersDto) {
    const filter: Record<string, unknown> = {};
    const search = queryUsersDto.search?.trim();
    const departmentCode = queryUsersDto.departmentCode?.trim();
    const roleName = queryUsersDto.roleName?.trim();

    if (search) {
      filter.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { empId: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ];
    }

    if (departmentCode && departmentCode.toLowerCase() !== 'all') {
      const department = await this.departmentModel
        .findOne({ code: departmentCode.toUpperCase() })
        .select('_id')
        .lean<{ _id?: unknown }>()
        .exec();

      filter.departmentId = department?._id ?? null;
    }

    if (roleName && roleName.toLowerCase() !== 'all') {
      const role = await this.roleModel
        .findOne({ name: roleName.toUpperCase() })
        .select('_id')
        .lean<{ _id?: unknown }>()
        .exec();

      filter.roleId = role?._id ?? null;
    }

    const populateOptions = [
      {
        path: 'roleId',
      },
      {
        path: 'positionId',
        populate: { path: 'departmentId' },
      },
      {
        path: 'departmentId',
      },
    ];
    return await paginate(this.userModel, queryUsersDto, filter, {
      populate: populateOptions,
      sort: { createdAt: -1 },
    });
  }

  async findOne(id: string) {
    const user = await this.userModel
      .findById(id)
      .populate('roleId')
      .populate('positionId')
      .populate('departmentId')
      .populate('managerId')
      .exec();

    const findLB = await this.leaveBalancesService.findByUserId(id);
    const findRqUser = await this.requestModel
      .find({ creatorId: id })
      .select('title status type createdAt values')
      .exec();
    return { user, lb: findLB, rq: findRqUser };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.managerId) {
      throw new BadRequestException(
        'Use PATCH /users/manager to assign manager',
      );
    }

    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .populate(['roleId', 'positionId', 'departmentId', 'managerId'])
      .exec();
  }
  remove(id: string) {
    return this.userModel.findByIdAndDelete(id).exec();
  }
  // Helper function để kiểm tra vòng lặp quản lý
  private async assertNoManagerCycle(userId: string, newManagerId: string) {
    let currentManagerId: string | null = newManagerId;
    const visited = new Set<string>();

    while (currentManagerId) {
      if (currentManagerId === userId) {
        throw new BadRequestException('Manager assignment creates a cycle');
      }

      if (visited.has(currentManagerId)) {
        // Dữ liệu cũ trong DB đã bị vòng lặp từ trước
        throw new BadRequestException(
          'Detected existing cycle in manager chain',
        );
      }

      visited.add(currentManagerId);

      const current = await this.userModel
        .findById(currentManagerId)
        .select('managerId')
        .lean<{ managerId?: unknown }>()
        .exec();

      if (!current?.managerId) {
        break;
      }

      currentManagerId = String(current.managerId as any);
    }
  }

  async getTeamMembers(user: any) {
    let managerId: any;

    if (!user.managerId._id && user.roleId?.name === 'MANAGER') {
      managerId = user._id;
    } else {
      const findManagerId = await this.userModel
        .findById(user._id)
        .select('managerId')
        .lean()
        .exec();
      managerId = findManagerId?.managerId || null;
    }

    if (!managerId) {
      throw new BadRequestException('User does not have a managerId');
    }
    const teamMembers = await this.userModel
      .find({ managerId: managerId })
      .populate({
        path: 'positionId',
        select: 'fullName',
      })
      .select('empId fullName email avatar phone positionId')
      .exec();
    return teamMembers;
  }

  async assignManagerByEmpId(
    userEmpId: string,
    managerEmpId: string,
    actor: any,
  ) {
    if (!actor?._id) {
      throw new BadRequestException('Invalid requester context');
    }

    if (!userEmpId || !managerEmpId) {
      throw new BadRequestException('userEmpId and managerId are required');
    }

    if (userEmpId === managerEmpId) {
      throw new BadRequestException('Cannot self-assign manager');
    }

    const user = await this.userModel
      .findOne({ empId: userEmpId })
      .select('_id empId')
      .exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const manager = await this.userModel
      .findOne({ empId: managerEmpId })
      .select('_id empId roleId')
      .populate<{ roleId: Pick<Role, 'name'> }>('roleId', 'name') // Lấy role name
      .exec();
    if (!manager) {
      throw new NotFoundException('Manager not found');
    }

    // Kiểm tra manager phải có role là MANAGER
    const managerRoleName = manager.roleId.name;
    if (managerRoleName !== 'MANAGER') {
      throw new BadRequestException(
        `User "${managerEmpId}" is not a manager. Only users with MANAGER role can be assigned as manager.`,
      );
    }

    await this.assertNoManagerCycle(String(user._id), String(manager._id));

    const updated = await this.userModel
      .findByIdAndUpdate(user._id, { managerId: manager._id }, { new: true })
      .populate(['roleId', 'positionId', 'departmentId', 'managerId'])
      .exec();
    return updated;
  }

  async removeManagerByEmpId(userEmpId: string, actor: any) {
    if (!actor?._id) {
      throw new BadRequestException('Invalid requester context');
    }

    if (!userEmpId) {
      throw new BadRequestException('userEmpId is required');
    }

    const user = await this.userModel
      .findOne({ empId: userEmpId })
      .select('_id empId')
      .exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updated = await this.userModel
      .findByIdAndUpdate(user._id, { managerId: null }, { new: true })
      .populate(['roleId', 'positionId', 'departmentId', 'managerId'])
      .exec();
    return updated;
  }
}
