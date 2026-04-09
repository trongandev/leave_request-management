import {
  IsEnum,
  IsIP,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { AuditAction } from '../../enum/audit-action.enum';
import { AuditModule } from '../../enum/audit-module.enum';

export class CreateAuditLogDto {
  @IsString({ message: 'userId must be a string' })
  @IsNotEmpty({ message: 'userId is required' })
  userId!: string;

  @IsEnum(AuditAction, {
    message: `action must be one of: ${Object.values(AuditAction).join(', ')}`,
  })
  @IsNotEmpty({ message: 'action is required' })
  action!: AuditAction;

  @IsEnum(AuditModule, {
    message: `module must be one of: ${Object.values(AuditModule).join(', ')}`,
  })
  @IsNotEmpty({ message: 'module is required' })
  module!: AuditModule;

  @IsOptional()
  @IsString({ message: 'resourceId must be a string' })
  resourceId?: string;

  @IsOptional()
  @IsObject({ message: 'oldValue must be an object' })
  oldValue?: Record<string, unknown>;

  @IsOptional()
  @IsObject({ message: 'newValue must be an object' })
  newValue?: Record<string, unknown>;

  @IsOptional()
  @IsIP(undefined, { message: 'ipAddress must be a valid IP address' })
  ipAddress?: string;

  @IsOptional()
  @IsString({ message: 'userAgent must be a string' })
  userAgent?: string;

  @IsOptional()
  @IsString({ message: 'description must be a string' })
  @MaxLength(2000, { message: 'description is too long' })
  description?: string;
}
