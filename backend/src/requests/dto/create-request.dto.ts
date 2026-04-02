import {
  IsEnum,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { RequestStatus } from 'src/enum/request-status.enum';

export class CreateRequestDto {
  @IsMongoId({ message: 'formTemplateId không hợp lệ' })
  @IsNotEmpty({ message: 'formTemplateId không được để trống' })
  formTemplateId!: string;

  @IsString({ message: 'code phải là chuỗi' })
  @IsNotEmpty({ message: 'code không được để trống' })
  code!: string;

  @IsString({ message: 'title phải là chuỗi' })
  @IsNotEmpty({ message: 'title không được để trống' })
  title!: string;

  @IsObject({ message: 'values phải là object' })
  @IsNotEmptyObject({}, { message: 'values không được rỗng' })
  values!: Record<string, unknown>;

  @IsOptional()
  @IsEnum(RequestStatus, {
    message:
      'status không hợp lệ. Giá trị cho phép: pending, approved, returned, rejected, cancelled',
  })
  status?: RequestStatus;

  @IsOptional()
  @IsInt({ message: 'currentStepOrder phải là số nguyên' })
  @Min(1, { message: 'currentStepOrder phải lớn hơn hoặc bằng 1' })
  currentStepOrder?: number;
}
