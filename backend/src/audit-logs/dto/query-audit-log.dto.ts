import { IsDateString, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../common/dto/pagination.dto';

export class QueryAuditLogDto extends PaginationDto {
  @IsOptional()
  @IsString({ message: 'userId must be a string' })
  userId?: string;

  @IsOptional()
  @IsString({ message: 'action must be a string' })
  action?: string;

  @IsOptional()
  @IsString({ message: 'module must be a string' })
  module?: string;

  @IsOptional()
  @IsString({ message: 'resourceId must be a string' })
  resourceId?: string;

  @IsOptional()
  @IsDateString({}, { message: 'fromDate must be a valid ISO date' })
  fromDate?: string;

  @IsOptional()
  @IsDateString({}, { message: 'toDate must be a valid ISO date' })
  toDate?: string;
}
