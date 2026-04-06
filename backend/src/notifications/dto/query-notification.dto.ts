import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { NotificationType } from '../../enum/notification-type.enum';

export class QueryNotificationDto extends PaginationDto {
  @IsOptional()
  @IsString({ message: 'recipientId must be a string' })
  recipientId?: string;

  @IsOptional()
  @IsString({ message: 'senderId must be a string' })
  senderId?: string;

  @IsOptional()
  @IsEnum(NotificationType, {
    message: `type must be one of: ${Object.values(NotificationType).join(', ')}`,
  })
  type?: NotificationType;

  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'boolean') {
      return value;
    }
    return String(value).toLowerCase() === 'true';
  })
  @IsBoolean({ message: 'isRead must be a boolean' })
  isRead?: boolean;

  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'boolean') {
      return value;
    }
    return String(value).toLowerCase() === 'true';
  })
  @IsBoolean({ message: 'isSystem must be a boolean' })
  isSystem?: boolean;
}
