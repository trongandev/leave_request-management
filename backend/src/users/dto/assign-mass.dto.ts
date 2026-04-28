import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class AssignMassDto {
  @ApiProperty({
    example: '2026-04-28T02:20:27.299Z',
    description: 'Ngày tạo (ISO string) để tìm user',
  })
  @IsNotEmpty()
  createdAt!: string;

  @ApiProperty({
    example: '69d8e35e583c3716a2a8de8f',
    description: 'manager  hoặc manager _id',
  })
  @IsNotEmpty()
  @IsString()
  managerId!: string;
}
