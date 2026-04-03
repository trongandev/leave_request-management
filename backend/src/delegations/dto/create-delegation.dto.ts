import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

export class CreateDelegationDto {
  @IsMongoId({ message: 'fromUserId không hợp lệ' })
  @IsNotEmpty({ message: 'fromUserId không được để trống' })
  fromUserId!: string;

  @IsMongoId({ message: 'toUserId không hợp lệ' })
  @IsNotEmpty({ message: 'toUserId không được để trống' })
  toUserId!: string;

  @IsDateString({}, { message: 'startDate phải là định dạng thời gian hợp lệ' })
  @IsNotEmpty({ message: 'startDate không được để trống' })
  startDate!: string;

  @IsDateString({}, { message: 'endDate phải là định dạng thời gian hợp lệ' })
  @IsNotEmpty({ message: 'endDate không được để trống' })
  endDate!: string;

  @IsBoolean({ message: 'applyToAll phải là boolean' })
  applyToAll!: boolean;

  @ValidateIf((dto: CreateDelegationDto) => dto.applyToAll === false)
  @IsArray({ message: 'specificTypeCode phải là mảng' })
  @IsString({ each: true, message: 'specificTypeCode chỉ chứa chuỗi' })
  @IsNotEmpty({
    each: true,
    message: 'specificTypeCode không được chứa phần tử rỗng',
  })
  specificTypeCode?: string[];

  @IsOptional()
  @IsBoolean({ message: 'isActive phải là boolean' })
  isActive?: boolean;

  @IsOptional()
  @IsString({ message: 'reason phải là chuỗi' })
  reason?: string;

  @IsOptional()
  @IsMongoId({ message: 'creatorId không hợp lệ' })
  creatorId?: string;
}
