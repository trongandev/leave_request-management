import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from '../users/users.schema';
import { Role } from '../roles/roles.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Role.name) private roleModel: Model<Role>,
    private jwtService: JwtService,
  ) {}

  // ─── LOGIN ───────────────────────────────────────────────────────────────────
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // 1. Tìm user, populate role để lấy permissions
    const user = await this.userModel
      .findOne({ email })
      .populate<{ roleId: Role }>('roleId')
      .exec();

    if (!user) {
      throw new UnauthorizedException(
        'Tài khoản hoặc mật khẩu không chính xác',
      );
    }

    // 2. So sánh password với hash trong DB
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException(
        'Tài khoản hoặc mật khẩu không chính xác',
      );
    }

    // 3. Ký JWT
    const role = user.roleId as unknown as Role;
    const payload = {
      sub: user._id,
      email: user.email,
      role: role?.name,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken: accessToken,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: role?.name,
        permissions: role?.permissions,
      },
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      id: (populated as any)?._id,
      fullName: populated?.fullName,
      email: populated?.email,
      roleId: roleName,
      departmentId: populated?.departmentId,
    };
  }
}
