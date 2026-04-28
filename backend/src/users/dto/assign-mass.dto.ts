import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AssignMassDto {
  @ApiProperty({
    example: '2026-04-28T02:20:27.299Z',
    description: 'Ngày tạo (ISO string) để tìm user',
  })
  @IsNotEmpty()
  createdAt!: string;

  @ApiProperty({
    example: 'Nguyen Van A',
    description: 'Tên đầy đủ để tìm user',
  })
  @IsNotEmpty()
  @IsString()
  managerEmail!: string;
}
