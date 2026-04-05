import { IsString, IsOptional, IsDateString, IsBoolean } from 'class-validator';

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
  reason!: string;

  @IsDateString()
  @IsOptional()
  signedAt?: string;

  @IsString()
  @IsOptional()
  signatureUrl?: string;
}

export class ReturnApprovalStepDto {
  @IsString()
  reason!: string;

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

export class QueryPendingApprovalStepsDto {
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

  take?: number;
  skip?: number;
}
