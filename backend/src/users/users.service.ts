import { Get, Injectable } from '@nestjs/common';
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
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Counter.name) private counterModel: Model<Counter>,
    @InjectModel(Role.name) private roleModel: Model<Role>,
    @InjectModel(Department.name) private departmentModel: Model<Department>,
    @InjectModel(Position.name) private positionModel: Model<Position>,
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

    const newUser = new this.userModel({
      ...createUserDto,
      empId: finalEmployeeId,
      roleId: roleId,
    });
    const saveUser = newUser.save();
    return saveUser;
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
    const hashedPassword = await bcrypt.hash('DefAult@passw0rd', 10);
    const fakeData: CreateUserDto = {
      email: email,
      password: hashedPassword,
      fullName: fullName,
      // Giới hạn năm sinh từ 1980 đến 2005 để phù hợp thực tế đi làm
      gender: faker.person.sex(),
      birthDate: birthDate,
      roleName: roleName, // Gán role dựa trên logic
      departmentId: String(randomDept._id),
      positionId: String(randomPos ? randomPos._id : null),
      roleId: '',
    };
    try {
      return await this.create(fakeData);
    } catch (error) {
      // Nếu trùng email ngẫu nhiên thì thử lại một lần nữa
      console.error('Fake User Creation failed, retrying...', error.message);
      return this.createFakeUser();
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  async findAll(paginationDto: PaginationDto) {
    return await paginate(this.userModel, paginationDto);
  }

  findOne(id: string) {
    return this.userModel.findById(id).exec();
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
