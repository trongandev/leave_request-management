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
import { PushNotiGateway } from 'src/push-noti/push-noti.gateway';
import { CLIENT_RENEG_LIMIT } from 'tls';

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
    private pushNotiGateway: PushNotiGateway,
  ) {}

  pushNotiToUser(id: string, user: any) {
    // const managerId = user?.managerId?._id;
    // if (!managerId) {
    //   throw new NotFoundException('User does not have a manager to notify');
    //   return;
    // }

    this.pushNotiGateway.sendNotificationToUser(id, {
      content: `Nhân viên ${user._id} vừa nộp một đơn. Vui lòng kiểm tra!`,
      requestId: 'ID_DON_VUA_TAO',
      type: 'LEAVE_REQUEST',
    });
  }

  testNotificationCurrentUser(user: any) {
    const userId = user?._id;
    this.pushNotiGateway.sendNotificationToUser(userId, {
      title: `${user.fullName}`,
      content: `Vừa tạo đơn xin nghỉ phép. Vui lòng kiểm tra!`,
      link: 'http://localhost:5173/employee/my-request-history-list',
      requestId: 'ID_DON_VUA_TAO',
      avatar: user?.avatar,
      type: 'LEAVE_REQUEST',
      isShowModel: true,
    });
  }

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
    // if (count < 1) {
    //   throw new BadRequestException('Count must be at least 1');
    // }
    // if (count > 100) {
    //   throw new BadRequestException('Count must not exceed 100');
    // }
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

    const usersToCreate: Array<Record<string, unknown>> = [];
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
            `Failed to create leave balance for user ${String(user._id)}:`,
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
    const birthYear = new Date().getFullYear().toString().slice(-2);
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
    const role =
      department.code === 'HR' ? roleMap.get('HR') : roleMap.get(roleName);
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
    // With direct managerId stored on user
    const visited = new Set<string>();
    let currentId: string | undefined = newManagerId;

    while (currentId) {
      if (currentId === userId) {
        throw new BadRequestException('Manager assignment creates a cycle');
      }
      if (visited.has(currentId)) break;
      visited.add(currentId);

      const managerUser = await this.userModel
        .findById(currentId)
        .select('managerId')
        .lean<{ managerId?: string }>()
        .exec();

      currentId = managerUser?.managerId
        ? String(managerUser.managerId)
        : undefined;
    }
  }

  async getTeamMembers(user: any) {
    const isManager = user.roleId.name === 'MANAGER';

    if (isManager) {
      // Team members for a manager are users who report to them
      const teamMembers = await this.userModel
        .find({ managerId: user._id })
        .select(
          'empId fullName email avatar phone departmentId positionId status roleId',
        )
        .populate(['departmentId', 'positionId', 'roleId'])
        .exec();

      const teamMemberIds = teamMembers.map((member) => String(member._id));

      const getRequestAllTeamMembers = await this.requestModel
        .find({
          creatorId: { $in: teamMemberIds },
          status: 'pending',
        })
        .select('code values createdAt creatorId')
        .populate({
          path: 'creatorId',
          select: 'avatar _id fullName email roleId departmentId positionId',
          populate: [
            { path: 'roleId' },
            { path: 'departmentId' },
            { path: 'positionId' },
          ],
        })
        .exec();

      return { teamMember: [...teamMembers, user], getRequestAllTeamMembers };
    } else {
      // For employee, find their manager first
      const myManagerId = user.managerId?._id || user.managerId;
      if (!myManagerId) return [user];

      // Team members are people with the same manager
      const teamMembers = await this.userModel
        .find({ managerId: myManagerId })
        .select(
          'empId fullName email avatar phone departmentId positionId status roleId',
        )
        .populate(['departmentId', 'positionId', 'roleId'])
        .exec();

      const manager = await this.userModel
        .findById(myManagerId)
        .select(
          'empId fullName email avatar phone departmentId positionId status roleId',
        )
        .populate(['departmentId', 'positionId', 'roleId'])
        .exec();

      return manager ? [...teamMembers, manager] : teamMembers;
    }
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

    const manager = await this.userModel
      .findOne({ empId: managerEmpId })
      .select('_id empId roleId')
      .populate<{ roleId: Pick<Role, 'name'> }>('roleId', 'name')
      .exec();

    if (!manager) {
      throw new NotFoundException('Manager not found');
    }

    if (manager.roleId.name !== 'MANAGER') {
      throw new BadRequestException(`User "${managerEmpId}" is not a manager.`);
    }

    const employeeRole = await this.roleModel
      .findOne({ name: 'EMPLOYEE' })
      .exec();
    if (!employeeRole) {
      throw new Error('EMPLOYEE role not found');
    }

    const userToAssign = await this.userModel
      .findOne({ empId: userEmpId })
      .select('_id empId roleId')
      .exec();

    if (!userToAssign) {
      throw new NotFoundException('User not found');
    }

    if (String(userToAssign.roleId) !== String(employeeRole._id)) {
      throw new BadRequestException(
        'Can only assign manager to users with EMPLOYEE role',
      );
    }

    return this.userModel
      .findByIdAndUpdate(
        userToAssign._id,
        { $set: { managerId: manager._id } },
        { new: true },
      )
      .populate(['roleId', 'positionId', 'departmentId', 'managerId']);
  }

  async assignMassManagerByEmpId(
    userEmpId: string,
    managerEmpId: string,
    actor: any,
    createdAt?: string,
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

    const manager = await this.userModel
      .findOne({ empId: managerEmpId })
      .select('_id empId roleId')
      .populate<{ roleId: Pick<Role, 'name'> }>('roleId', 'name')
      .exec();

    if (!manager) {
      throw new NotFoundException('Manager not found');
    }

    const managerRoleName = manager.roleId.name;
    if (managerRoleName !== 'MANAGER') {
      throw new BadRequestException(
        `User "${managerEmpId}" is not a manager. Only users with MANAGER role can be assigned as manager.`,
      );
    }

    // Lấy roleId của role EMPLOYEE
    const employeeRole = await this.roleModel
      .findOne({ name: 'EMPLOYEE' })
      .exec();
    if (!employeeRole) {
      throw new Error('EMPLOYEE role not found in database');
    }

    if (createdAt) {
      const parsed = new Date(createdAt);
      if (isNaN(parsed.getTime())) {
        throw new BadRequestException('Invalid createdAt date');
      }

      const start = new Date(parsed);
      start.setUTCHours(0, 0, 0, 0);
      const end = new Date(start);
      end.setUTCDate(end.getUTCDate() + 1);

      // Cập nhật managerId cho TẤT CẢ các user có role EMPLOYEE được tạo trong ngày này
      const result = await this.userModel.updateMany(
        {
          createdAt: { $gte: start, $lt: end },
          roleId: employeeRole._id,
          _id: { $ne: manager._id }, // Không tự gán cho chính mình
        },
        { $set: { managerId: manager._id } },
      );

      return {
        message: 'Mass assignment completed',
        found: result.matchedCount,
        modified: result.modifiedCount,
      };
    }

    // Trường hợp gán lẻ 1 user: cũng phải check role EMPLOYEE
    const userToAssign = await this.userModel
      .findOne({ empId: userEmpId })
      .select('_id empId roleId')
      .exec();

    if (!userToAssign) {
      throw new NotFoundException('User not found');
    }

    if (String(userToAssign.roleId) !== String(employeeRole._id)) {
      throw new BadRequestException(
        'Can only assign manager to users with EMPLOYEE role',
      );
    }

    return this.userModel
      .findByIdAndUpdate(
        userToAssign._id,
        { $set: { managerId: manager._id } },
        { new: true },
      )
      .populate(['roleId', 'positionId', 'departmentId', 'managerId']);
  }

  // New: assign manager by date (payload uses manager _id and dateId)
  async assignMassManagerByDate(
    managerEmail: string,
    dateId: string,
    actor: any,
  ) {
    if (!actor?._id) throw new BadRequestException('Invalid requester context');
    if (!managerEmail || !dateId)
      throw new BadRequestException('managerEmail and dateId are required');

    // managerId may be empId or _id; try empId first
    const findManager = await this.userModel
      .findOne({ email: managerEmail })
      .select('_id empId roleId')
      .populate<{ roleId: Pick<Role, 'name'> }>('roleId', 'name')
      .exec();

    if (!findManager) {
      throw new NotFoundException('Manager not found by email');
    }
    const manager = await this.userModel
      .findById(findManager._id)
      .select('_id empId roleId managerId')
      .populate<{ roleId: Pick<Role, 'name'> }>('roleId', 'name')
      .exec();
    if (!manager) throw new NotFoundException('Manager not found');
    const managerRoleName = manager.roleId?.name;
    if (managerRoleName !== 'MANAGER') {
      throw new BadRequestException('Target user is not a manager');
    }

    const parsed = new Date(dateId);
    if (isNaN(parsed.getTime()))
      throw new BadRequestException('Invalid dateId');

    const start = new Date(parsed);
    start.setUTCHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setUTCDate(end.getUTCDate() + 1);

    // Lấy roleId của role EMPLOYEE
    const employeeRole = await this.roleModel
      .findOne({ name: 'EMPLOYEE' })
      .exec();
    if (!employeeRole) {
      throw new Error('EMPLOYEE role not found in database');
    }

    // Cập nhật managerId cho TẤT CẢ các user có role EMPLOYEE được tạo trong ngày này
    const result = await this.userModel.updateMany(
      {
        createdAt: { $gte: start, $lt: end },
        roleId: employeeRole._id,
        _id: { $ne: manager._id },
      },
      { $set: { managerId: manager._id } },
    );

    return {
      message: 'Mass assignment by date completed',
      found: result.matchedCount,
      modified: result.modifiedCount,
    };
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

    // Set managerId to null for this user
    return this.userModel
      .findByIdAndUpdate(user._id, { $set: { managerId: null } }, { new: true })
      .populate(['roleId', 'positionId', 'departmentId', 'managerId'])
      .exec();
  }
}
