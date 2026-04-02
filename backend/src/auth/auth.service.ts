import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from '../users/users.schema';
import { Role } from '../roles/roles.schema';
import { LeaveBalance } from 'src/leave-balances/leave-balances.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Role.name) private roleModel: Model<Role>,
    @InjectModel(LeaveBalance.name)
    private leaveBalanceModel: Model<LeaveBalance>,
    private jwtService: JwtService,
  ) {}

  // ─── LOGIN ───────────────────────────────────────────────────────────────────
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // 1. Tìm user, populate role để lấy permissions
    const user = await this.userModel
      .findOne({ email })
      .populate([
        { path: 'roleId', select: '-_id name' },
        { path: 'positionId', select: '-_id fullName name description' },
        { path: 'departmentId', select: '-_id code name originName' },
        {
          path: 'managerId',
          select: '-_id empId fullName avatar',
          populate: [
            { path: 'roleId', select: '-_id name' },
            { path: 'positionId', select: '-_id fullName' },
          ],
        },
      ])
      .select('-__v  -updatedAt')
      .lean()
      .exec();

    if (!user) {
      throw new BadRequestException('Tài khoản hoặc mật khẩu không chính xác');
    }

    const findLB = await this.leaveBalanceModel
      .findOne({ userId: String(user._id) })
      .select('-_id remainingDays totalDays')
      .exec();

    // 2. So sánh password với hash trong DB
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Tài khoản hoặc mật khẩu không chính xác');
    }

    // 3. Ký JWT
    const role = user.roleId as unknown as Role;
    const payload = {
      sub: user._id,
      email: user.email,
      role: role?.name,
    };

    const accessToken = this.jwtService.sign(payload);
    delete user.password; // Xóa password trước khi trả về
    return {
      accessToken: accessToken,
      user: user,
      lb: findLB,
    };
  }

  // ─── REGISTER ────────────────────────────────────────────────────────────────
  // Chỉ admin / manager mới được gọi API này (kiểm tra ở controller)
  async register(registerDto: RegisterDto) {
    const existed = await this.userModel.findOne({ email: registerDto.email });
    if (existed) {
      throw new ForbiddenException('Email đã được sử dụng');
    }

    // tìm roleId cho employee mặc định khi tạo user mới
    const findRoleId = await this.roleModel
      .findOne({ name: 'EMPLOYEE' })
      .exec();
    if (!findRoleId) {
      throw new ForbiddenException('Role employee không tồn tại');
    }

    // Hash password trước khi lưu
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // 4. Tạo user mới
    const newUser = new this.userModel({
      ...registerDto,
      roleId: findRoleId._id,
      password: hashedPassword,
    });
    await newUser.save();

    // 5. Populate role để trả về thông tin đầy đủ
    const populated = await this.userModel
      .findById(newUser._id)
      .populate<{ roleId: Role }>('roleId')
      .lean()
      .exec();

    const roleName = (populated?.roleId as unknown as Role)?.name;

    return {
      id: (populated as any)?._id,
      fullName: populated?.fullName,
      email: populated?.email,
      roleId: roleName,
      departmentId: populated?.departmentId,
    };
  }
}
