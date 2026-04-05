import {
  IsIP,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateAuditLogDto {
  @IsString({ message: 'userId must be a string' })
  @IsNotEmpty({ message: 'userId is required' })
  userId!: string;

  @IsString({ message: 'action must be a string' })
  @IsNotEmpty({ message: 'action is required' })
  action!: string;

  @IsString({ message: 'module must be a string' })
  @IsNotEmpty({ message: 'module is required' })
  module!: string;

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
