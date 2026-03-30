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
import { PaginationDto } from '../common/dto/pagination.dto';
import { Counter } from 'src/counters/counters.schema';
import { Role } from 'src/roles/roles.schema';
import { faker } from '@faker-js/faker/locale/vi';
import { Department } from 'src/departments/departments.schema';
import { Position } from 'src/positions/positions.schema';
import * as bcrypt from 'bcrypt';
import { removeVietnameseTones } from 'src/common/utils/utils';
import { LeaveBalancesService } from '../leave-balances/leave-balances.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Counter.name) private counterModel: Model<Counter>,
    @InjectModel(Role.name) private roleModel: Model<Role>,
    @InjectModel(Department.name) private departmentModel: Model<Department>,
    @InjectModel(Position.name) private positionModel: Model<Position>,
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

  async createFakeUser() {
    // 1. Lấy ngẫu nhiên 1 phòng ban
    const departments = await this.departmentModel.find();
    const randomDept =
      departments[Math.floor(Math.random() * departments.length)];

    // 2. Tìm các vị trí thuộc phòng ban đó
    const positions = await this.positionModel.find({
      departmentId: String(randomDept._id),
    });

    // Phòng hờ trường hợp phòng ban đó chưa có vị trí nào
    const randomPos =
      positions.length > 0
        ? positions[Math.floor(Math.random() * positions.length)]
        : null;

    let roleName = 'EMPLOYEE'; // Mặc định

    // Logic tự động phân vai trò dựa trên Level của vị trí
    if (randomPos && randomPos.level >= 3) {
      roleName = 'MANAGER';
    }

    // Ngoại lệ cho phòng HR (Dù level thấp vẫn có thể là HR role nếu bạn muốn)
    if (randomDept.code === 'HR') {
      roleName = 'HR';
    }

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

    const birthDate = new Date(
      faker.date.birthdate({ min: 1980, max: 2005, mode: 'year' }),
    );
    const birthDateSuffix = birthDate.getFullYear().toString().slice(-2);

    // Chèn năm sinh vào vị trí ngẫu nhiên
    const insertIndex = Math.floor(Math.random() * (nameParts.length + 1));
    nameParts.splice(insertIndex, 0, birthDateSuffix);
    const email = `${nameParts.join('.')}` + '@lrm.com';
    const defaultPassword = 'DefAult@passw0rd';
    const fakeData: CreateUserDto = {
      phone: faker.helpers.fromRegExp(/0[35789][0-9]{8}/),
      email: email,
      password: defaultPassword,
      fullName: fullName,
      avatar: faker.image.avatar(),
      // Giới hạn năm sinh từ 1980 đến 2005 để phù hợp thực tế đi làm
      gender: faker.person.sex(),
      birthDate: birthDate,
      roleName: roleName, // Gán role dựa trên logic
      departmentId: String(randomDept._id),
      positionId: String(randomPos ? randomPos._id : null),
      roleId: '',
    };
    console.log(fakeData);
    try {
      return await this.create(fakeData);
    } catch (error) {
      // Nếu trùng email ngẫu nhiên thì thử lại một lần nữa
      const message = error instanceof Error ? error.message : String(error);
      console.error('Fake User Creation failed, retrying...', message);
      return this.createFakeUser();
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  async findAll(paginationDto: PaginationDto) {
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
    return await paginate(
      this.userModel,
      paginationDto,
      {},
      {
        populate: populateOptions,
        sort: { createdAt: -1 },
      },
    );
  }

  findOne(id: string) {
    return this.userModel
      .findById(id)
      .populate('roleId')
      .populate('positionId')
      .populate('departmentId')
      .populate('managerId')
      .exec();
  }
  /*
  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }
  */

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
    const self = this as any;

    if (typeof self.delete === 'function') {
      return self.delete(id);
    }

    if (typeof self.deleteById === 'function') {
      return self.deleteById(id);
    }

    if (typeof self.removeById === 'function') {
      return self.removeById(id);
    }

    throw new Error(`UsersService.remove is not implemented (id=${id})`);
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
