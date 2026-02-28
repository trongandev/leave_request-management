/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
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
import { RequirePermissions } from './decorators/permissions.decorator';
import { Permission } from 'src/enum/permission.enum';

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
    res.cookie('accessToken', result.accessToken, {
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
  @RequirePermissions(Permission.MANAGE_USERS)
  @ApiOperation({
    summary: 'Tạo tài khoản nhân viên mới (chỉ Admin / Manager / HR)',
  })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('logout')
  @ApiOperation({ summary: 'Đăng xuất, xóa accessToken' })
  logout(@Response({ passthrough: true }) res) {
    res.clearCookie('accessToken');
    return { message: 'Đăng xuất thành công' };
  }
}
