import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFormTemplateDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  vieName: string;

  @IsString()
  @IsNotEmpty()
  engName: string;

  @IsNotEmpty()
  fields: any[];

  @IsOptional()
  @IsString()
  submitButtonText: string;

  @IsOptional()
  version?: number;

  @IsOptional()
  isActive?: boolean;

  @IsOptional()
  autoApprove?: boolean;

  @IsOptional()
  maxDays?: number;

  @IsOptional()
  requireAttachment?: boolean;

  @IsOptional()
  isReductible?: boolean;
}
