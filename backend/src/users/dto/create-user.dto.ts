import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
  MaxLength,
  IsDate,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

// OmitType(User, ['status'])	Lấy tất cả fields trừ status
// PickType(User, ['email', 'password'])	Chỉ lấy một số fields được chỉ định
// PartialType(User)	Lấy tất cả fields nhưng đều optional
// IntersectionType(A, B)	Gộp 2 class lại

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  email: string;

  @ApiProperty({ example: 'StrongP@ss123' })
  @IsString({ message: 'Password phải là chuỗi' })
  @IsNotEmpty({ message: 'Password không được để trống' })
  @MinLength(8, { message: 'Password phải có ít nhất 8 ký tự' })
  @MaxLength(32, { message: 'Password không được vượt quá 32 ký tự' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message:
      'Password phải chứa ít nhất 1 chữ thường, 1 chữ hoa, 1 số và 1 ký tự đặc biệt',
  })
  password: string;

  @ApiProperty({ example: 'Nguyễn Văn A' })
  @IsString({ message: 'Họ tên phải là chuỗi' })
  @IsNotEmpty({ message: 'Họ tên không được để trống' })
  @MinLength(2, { message: 'Họ tên phải có ít nhất 2 ký tự' })
  @MaxLength(100, { message: 'Họ tên không được vượt quá 100 ký tự' })
  @Matches(/^[\p{L}\s]+$/u, {
    message: 'Họ tên chỉ được chứa chữ cái và khoảng trắng',
  })
  fullName: string;

  @ApiProperty({ example: '15/03/1990' })
  @Transform(({ value }) => {
    if (typeof value !== 'string') return value;
    const [day, month, year] = value.split('/');
    const date = new Date(`${year}-${month}-${day}`);
    return isNaN(date.getTime()) ? value : date;
  })
  @IsDate({ message: 'Ngày sinh không hợp lệ' })
  @IsNotEmpty({ message: 'Ngày sinh không được để trống' })
  birthDate: Date;

  @IsOptional()
  @IsString({ message: 'gender phải là chuỗi' })
  gender: string;

  @IsOptional()
  @IsString({ message: 'roleId phải là chuỗi' })
  roleId: string;

  @IsOptional()
  @IsString({ message: 'roleName phải là chuỗi' })
  roleName: string;

  @IsOptional()
  @IsString({ message: 'departmentId phải là chuỗi' })
  departmentId: string;

  @IsOptional()
  @IsString({ message: 'positionId phải là chuỗi' })
  positionId: string;
}
