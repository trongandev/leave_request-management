import { IsDateString, IsEnum, IsMongoId, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { RequestStatus } from 'src/enum/request-status.enum';

export class QueryRequestsDto extends PaginationDto {
  @IsOptional()
  @IsEnum(RequestStatus, {
    message:
      'status không hợp lệ. Giá trị cho phép: pending, approved, returned, rejected, cancelled',
  })
  status?: RequestStatus;

  @IsOptional()
  @IsMongoId({ message: 'creatorId không hợp lệ' })
  creatorId?: string;

  @IsOptional()
  @IsMongoId({ message: 'formTemplateId không hợp lệ' })
  formTemplateId?: string;

  @IsOptional()
  @IsDateString(
    {},
    { message: 'createdFrom phải là định dạng ISO datetime hợp lệ' },
  )
  createdFrom?: string;

  @IsOptional()
  @IsDateString(
    {},
    { message: 'createdTo phải là định dạng ISO datetime hợp lệ' },
  )
  createdTo?: string;
}
