import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../common/dto/pagination.dto';

export class QueryNotificationDto extends PaginationDto {
  @IsOptional()
  @IsString({ message: 'recipientId must be a string' })
  recipientId?: string;

  @IsOptional()
  @IsString({ message: 'senderId must be a string' })
  senderId?: string;

  @IsOptional()
  @IsString({ message: 'type must be a string' })
  type?: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'boolean') {
      return value;
    }
    return String(value).toLowerCase() === 'true';
  })
  @IsBoolean({ message: 'isRead must be a boolean' })
  isRead?: boolean;
}
