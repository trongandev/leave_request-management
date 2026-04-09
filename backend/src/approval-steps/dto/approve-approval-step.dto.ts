import { IsString, IsOptional, IsDateString, IsBoolean } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class ApproveApprovalStepDto {
  @IsString()
  @IsOptional()
  comment?: string;

  @IsDateString()
  @IsOptional()
  signedAt?: string;

  @IsString()
  @IsOptional()
  signatureUrl?: string;
}

export class RejectApprovalStepDto {
  @IsString()
  @IsOptional()
  comment?: string;

  @IsString()
  @IsOptional()
  reason?: string;

  @IsDateString()
  @IsOptional()
  signedAt?: string;

  @IsString()
  @IsOptional()
  signatureUrl?: string;
}

export class ReturnApprovalStepDto {
  @IsString()
  @IsOptional()
  comment?: string;

  @IsString()
  @IsOptional()
  reason?: string;

  @IsDateString()
  @IsOptional()
  signedAt?: string;
}

export class DelegateApprovalStepDto {
  @IsString()
  delegateToUserId!: string;

  @IsString()
  @IsOptional()
  delegationId?: string;

  @IsString()
  @IsOptional()
  reason?: string;

  @IsDateString()
  @IsOptional()
  newDeadlineAt?: string;
}

export class QueryPendingApprovalStepsDto extends PaginationDto {
  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  stepLabel?: string;

  @IsString()
  @IsOptional()
  requestTypeCode?: string;

  @IsString()
  @IsOptional()
  departmentId?: string;

  @IsBoolean()
  @IsOptional()
  isFinalStep?: boolean;

  @IsOptional()
  take?: number;
  @IsOptional()
  skip?: number;
}
