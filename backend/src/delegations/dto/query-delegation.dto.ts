import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';
import { PaginationDto } from '../../common/dto/pagination.dto';

export class QueryDelegationDto extends PaginationDto {
  @IsOptional()
  @IsMongoId({ message: 'fromUserId không hợp lệ' })
  fromUserId?: string;

  @IsOptional()
  @IsMongoId({ message: 'toUserId không hợp lệ' })
  toUserId?: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'boolean') {
      return value;
    }
    return String(value).toLowerCase() === 'true';
  })
  @IsBoolean({ message: 'isActive phải là boolean' })
  isActive?: boolean;

  @IsOptional()
  @IsDateString({}, { message: 'atDate phải là định dạng thời gian hợp lệ' })
  atDate?: string;

  @IsOptional()
  @IsString({ message: 'typeCode phải là chuỗi' })
  typeCode?: string;
}
