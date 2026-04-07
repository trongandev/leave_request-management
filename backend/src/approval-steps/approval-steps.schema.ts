import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  ApprovalStepStatus,
  APPROVAL_STEP_STATUS_ARRAY,
} from '../enum/approval-step-status.enum';

@Schema({ timestamps: true, collection: 'approval_steps' })
export class ApprovalStep extends Document {
  @Prop({ required: true, unique: true, trim: true, immutable: true })
  apsDisplayId!: string;

  @Prop({ type: 'ObjectId', ref: 'Request', required: true })
  requestId!: string;

  // Stable link to timeline aggregate document used by UI workflow rendering.
  @Prop({ type: 'ObjectId', ref: 'ApprovalStepsFlowLog' })
  flowLogId?: string;

  @Prop({ type: 'ObjectId', ref: 'User', required: true })
  originalApproverId!: string;

  @Prop({ type: 'ObjectId', ref: 'User' })
  actualApproverId?: string;

  @Prop({ type: 'ObjectId', ref: 'Delegation' })
  delegationId?: string;

  @Prop({ required: true, min: 1 })
  stepOrder!: number;

  @Prop({ required: true, trim: true })
  stepLabel!: string;

  @Prop({ type: [String], default: [] })
  groupId!: string[];

  @Prop({
    type: String,
    required: true,
    enum: APPROVAL_STEP_STATUS_ARRAY,
    default: ApprovalStepStatus.PENDING,
  })
  status!: ApprovalStepStatus;

  @Prop({ default: false })
  isFinalStep!: boolean;

  @Prop({ default: true })
  requiredAll!: boolean;

  @Prop()
  comment?: string;

  @Prop()
  notifiedAt?: Date;

  @Prop()
  deadlineAt?: Date;

  @Prop()
  signedAt?: Date;

  @Prop()
  signatureUrl?: string;
}

export const ApprovalStepSchema = SchemaFactory.createForClass(ApprovalStep);
ApprovalStepSchema.index({ apsDisplayId: 1 }, { unique: true });

ApprovalStepSchema.index(
  { requestId: 1, stepOrder: 1, originalApproverId: 1 },
  { unique: true },
);
ApprovalStepSchema.index({ status: 1, deadlineAt: 1 });
ApprovalStepSchema.index({ originalApproverId: 1 });
ApprovalStepSchema.index({ groupId: 1 });
ApprovalStepSchema.index({ flowLogId: 1 });
