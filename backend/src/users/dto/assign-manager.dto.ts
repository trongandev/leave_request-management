import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AssignManagerDto {
  @ApiProperty({ example: '22890001', description: 'empId của manager' })
  @IsNotEmpty({ message: 'managerId is required' })
  @IsString({ message: 'managerId must be a string' })
  managerId!: string;
}