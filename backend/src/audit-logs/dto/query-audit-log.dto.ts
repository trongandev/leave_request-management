import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { AuditAction } from '../../enum/audit-action.enum';
import { AuditModule } from '../../enum/audit-module.enum';

export class QueryAuditLogDto extends PaginationDto {
  @IsOptional()
  @IsString({ message: 'userId must be a string' })
  userId?: string;

  @IsOptional()
  @IsEnum(AuditAction, {
    message: `action must be one of: ${Object.values(AuditAction).join(', ')}`,
  })
  action?: AuditAction;

  @IsOptional()
  @IsEnum(AuditModule, {
    message: `module must be one of: ${Object.values(AuditModule).join(', ')}`,
  })
  module?: AuditModule;

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
