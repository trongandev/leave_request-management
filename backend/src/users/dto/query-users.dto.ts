import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../common/dto/pagination.dto';

export class QueryUsersDto extends PaginationDto {
  @IsString()
  @IsOptional()
  search?: string;

  @IsString()
  @IsOptional()
  departmentCode?: string;

  @IsString()
  @IsOptional()
  roleName?: string;

  @IsString()
  @IsOptional()
  leaveType?: string;

  @IsString()
  @IsOptional()
  location?: string;
}
