import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class AdjustLeaveBalanceDto {
  @Type(() => Number)
  @IsNumber()
  @Min(-365)
  @Max(365)
  changeAmount!: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  reason!: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  requestId?: string;
}
