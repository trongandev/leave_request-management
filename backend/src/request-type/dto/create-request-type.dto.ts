import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateRequestTypeDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  code!: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  desc?: string;

  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  isDeductible?: boolean;

  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  requireAttachment?: boolean;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(365)
  @IsOptional()
  maxDays?: number;

  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  autoApproval?: boolean;
}
