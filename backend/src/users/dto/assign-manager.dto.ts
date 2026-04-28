import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsDateString } from 'class-validator';

export class AssignManagerDto {
  @ApiProperty({ example: '22890001', description: 'empId của manager' })
  @IsNotEmpty({ message: 'managerId is required' })
  @IsString({ message: 'managerId must be a string' })
  managerId!: string;

  @ApiProperty({ example: '22890001', description: 'empId của employee' })
  @IsNotEmpty({ message: 'empId is required' })
  @IsString({ message: 'empId must be a string' })
  empId!: string;

  @ApiProperty({
    example: '2026-04-28T00:00:00.000Z',
    description: 'Ngày tạo (ISO string). Nếu cung cấp, sẽ áp dụng cho tất cả user tạo cùng ngày',
    required: false,
  })
  @IsOptional()
  @IsDateString({}, { message: 'createdAt must be an ISO date string' })
  createdAt?: string;
}

export class RemoveManagerDto {
  @ApiProperty({ example: '22890001', description: 'empId của employee' })
  @IsNotEmpty({ message: 'empId is required' })
  @IsString({ message: 'empId must be a string' })
  empId!: string;
}
