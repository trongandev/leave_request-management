import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { FlowLogStatus } from '../enum/flow-log-statuses.enum';
import {
  ApprovalFlowStep,
  ApprovalFlowStepSchema,
} from './approval-flow-step.schema';

const FLOW_LOG_STATUS_VALUES = Object.values(FlowLogStatus);

@Schema({ timestamps: true, collection: 'approval_steps_flow_log' })
export class ApprovalStepsFlowLog extends Document {
  @Prop({ type: 'ObjectId', ref: 'Request', required: true, unique: true })
  requestId!: string;

  @Prop({ required: true, default: 0, min: 0 })
  currentStepOrder!: number;

  @Prop({ type: [ApprovalFlowStepSchema], default: [] })
  steps!: ApprovalFlowStep[];

  @Prop({
    type: String,
    required: true,
    enum: FLOW_LOG_STATUS_VALUES,
    default: FlowLogStatus.PROCESSING,
  })
  status!: FlowLogStatus;
}

export const ApprovalStepsFlowLogSchema =
  SchemaFactory.createForClass(ApprovalStepsFlowLog);

ApprovalStepsFlowLogSchema.index({ requestId: 1 }, { unique: true });
