import { Type } from 'class-transformer';
import {
  IsInt,
  IsMongoId,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from 'class-validator';

export class CreateLeaveBalanceDto {
  @IsMongoId()
  userId!: string;

  @Type(() => Number)
  @IsInt()
  @Min(2000)
  year!: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Min(-365)
  @Max(365)
  adjustedDays?: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Min(0)
  usedDays?: number;
}
