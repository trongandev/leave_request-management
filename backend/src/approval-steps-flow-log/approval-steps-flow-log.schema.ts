import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum FlowLogStatus {
  PROCESSING = 'processing',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
  RETURNED = 'returned',
}

export enum FlowLogStepStatus {
  SCHEDULED = 'scheduled',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

const FLOW_LOG_STATUS_VALUES = Object.values(FlowLogStatus);
const FLOW_LOG_STEP_STATUS_VALUES = Object.values(FlowLogStepStatus);

@Schema({ _id: false })
export class ApprovalFlowStep {
  @Prop({ required: true, min: 0 })
  order!: number;

  @Prop({ required: true, trim: true })
  label!: string;

  @Prop({ required: true, enum: FLOW_LOG_STEP_STATUS_VALUES })
  status!: FlowLogStepStatus;

  @Prop({ trim: true })
  performer?: string;

  @Prop()
  expectedDate?: Date;

  @Prop()
  updatedAt?: Date;
}

const ApprovalFlowStepSchema = SchemaFactory.createForClass(ApprovalFlowStep);

@Schema({ timestamps: true, collection: 'approval_steps_flow_log' })
export class ApprovalStepsFlowLog extends Document {
  @Prop({ type: 'ObjectId', ref: 'Request', required: true, unique: true })
  requestId!: string;

  @Prop({ required: true, default: 0, min: 0 })
  currentStepId!: number;

  @Prop({ type: [ApprovalFlowStepSchema], default: [] })
  steps!: ApprovalFlowStep[];

  @Prop({
    required: true,
    enum: FLOW_LOG_STATUS_VALUES,
    default: FlowLogStatus.PROCESSING,
  })
  status!: FlowLogStatus;
}

export const ApprovalStepsFlowLogSchema =
  SchemaFactory.createForClass(ApprovalStepsFlowLog);

ApprovalStepsFlowLogSchema.index({ requestId: 1 }, { unique: true });
