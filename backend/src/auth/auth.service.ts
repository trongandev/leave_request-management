import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/users.schema';
import { Role } from 'src/roles/roles.schema';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

// Các role được phép tạo tài khoản cho nhân viên mới
const ALLOWED_REGISTER_ROLES = ['admin', 'manager'];

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
  async register(registerDto: RegisterDto, callerRoleName: string) {
    // 1. Kiểm tra quyền của người gọi
    if (!ALLOWED_REGISTER_ROLES.includes(callerRoleName?.toLowerCase())) {
      throw new ForbiddenException(
        'Chỉ Manager hoặc Admin mới có quyền tạo tài khoản',
      );
    }

    // 2. Kiểm tra email đã tồn tại chưa
    const existed = await this.userModel.findOne({ email: registerDto.email });
    if (existed) {
      throw new ForbiddenException('Email đã được sử dụng');
    }

    // 3. Hash password trước khi lưu
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // 4. Tạo user mới
    const newUser = new this.userModel({
      ...registerDto,
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
      fullName: registerDto.fullName,
      email: registerDto.email,
      role: roleName,
      departmentId: registerDto.departmentId,
    };
  }
}
