import {
  Body,
  Controller,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Public } from './decorators/public.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

interface RequestWithUser extends Request {
  user: {
    role_id: {
      name: string;
    };
  };
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Đăng nhập, nhận access_token' })
  async login(
    @Body() loginDto: LoginDto,
    @Response({ passthrough: true }) res,
  ) {
    const result = await this.authService.login(loginDto);

    // Gán cookie vào response
    res.cookie('access_token', result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // chỉ dùng HTTPS ở production
      sameSite: 'strict',
      maxAge: 3600000, // 1 giờ (tính bằng milliseconds)
      path: '/',
    });

    return result;
  }

  // Yêu cầu đăng nhập; service sẽ kiểm tra role phải là admin/manager/hr
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('register')
  @ApiOperation({
    summary: 'Tạo tài khoản nhân viên mới (chỉ Admin / Manager / HR)',
  })
  register(@Body() registerDto: RegisterDto, @Request() req: RequestWithUser) {
    const callerRole = req.user?.role_id?.name;
    return this.authService.register(registerDto, callerRole);
  }
}
