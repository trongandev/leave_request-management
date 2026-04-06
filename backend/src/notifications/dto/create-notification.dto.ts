import {
  IsEnum,
  IsBoolean,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { NotificationType } from '../../enum/notification-type.enum';

export class CreateNotificationDto {
  @IsString({ message: 'recipientId must be a string' })
  @IsNotEmpty({ message: 'recipientId is required' })
  recipientId!: string;

  @IsOptional()
  @ValidateIf((dto: CreateNotificationDto) => dto.senderId !== null)
  @IsString({ message: 'senderId must be a string or null' })
  senderId?: string | null;

  @IsEnum(NotificationType, {
    message: `type must be one of: ${Object.values(NotificationType).join(', ')}`,
  })
  @IsNotEmpty({ message: 'type is required' })
  type!: NotificationType;

  @IsString({ message: 'title must be a string' })
  @IsNotEmpty({ message: 'title is required' })
  title!: string;

  @IsString({ message: 'content must be a string' })
  @IsNotEmpty({ message: 'content is required' })
  content!: string;

  @IsOptional()
  @IsString({ message: 'link must be a string' })
  link?: string;

  @IsOptional()
  @IsBoolean({ message: 'isRead must be a boolean' })
  isRead?: boolean;

  @IsOptional()
  @IsObject({ message: 'metadata must be an object' })
  metadata?: Record<string, unknown>;
}
