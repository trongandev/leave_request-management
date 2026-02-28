import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty({ message: 'Họ tên không được để trống' })
  @MinLength(3, { message: 'Họ tên phải có ít nhất 3 ký tự' })
  @ApiProperty({ example: 'Nguyễn Văn B', description: 'Họ và tên' })
  fullName: string;

  @IsEmail({}, { message: 'Email không hợp lệ' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  @ApiProperty({ example: 'b@example.com', description: 'Email đăng nhập' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  @Matches(/^(?=.*[A-Z]).+$/, {
    message: 'Mật khẩu phải có ít nhất 1 chữ hoa',
  })
  @Matches(/^(?=.*[!@#$%^&*]).+$/, {
    message: 'Mật khẩu phải có ít nhất 1 ký tự đặc biệt',
  })
  @ApiProperty({ example: 'Password@123', description: 'Mật khẩu' })
  password: string;
}
