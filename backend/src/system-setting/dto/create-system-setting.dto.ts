import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateSystemSettingDto {
  @IsString()
  @IsNotEmpty()
  key!: string;

  @IsNumber()
  @Min(0)
  @Max(365)
  value!: number;

  @IsString()
  @IsOptional()
  description?: string;
}
