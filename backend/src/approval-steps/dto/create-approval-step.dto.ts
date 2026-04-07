import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { ApprovalStepStatus } from '../../enum/approval-step-status.enum';

export class CreateApprovalStepDto {
  @IsString()
  requestId!: string;

  @IsString()
  @IsOptional()
  flowLogId?: string;

  @IsString()
  originalApproverId!: string;

  @IsString()
  @IsOptional()
  actualApproverId?: string;

  @IsString()
  @IsOptional()
  delegationId?: string;

  @IsInt()
  @Min(1)
  stepOrder!: number;

  @IsString()
  stepLabel!: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  groupId?: string[];

  @IsEnum(ApprovalStepStatus)
  @IsOptional()
  status?: ApprovalStepStatus;

  @IsBoolean()
  @IsOptional()
  isFinalStep?: boolean;

  @IsBoolean()
  @IsOptional()
  requiredAll?: boolean;

  @IsDateString()
  @IsOptional()
  notifiedAt?: string;

  @IsDateString()
  @IsOptional()
  deadlineAt?: string;

  @IsDateString()
  @IsOptional()
  signedAt?: string;

  @IsString()
  @IsOptional()
  comment?: string;

  @IsString()
  @IsOptional()
  signatureUrl?: string;
}
