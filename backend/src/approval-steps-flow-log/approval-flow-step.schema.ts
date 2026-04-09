import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { FlowLogStatus } from '../enum/flow-log-statuses.enum';

const FLOW_LOG_STATUS_VALUES = Object.values(FlowLogStatus);

@Schema({ _id: false })
export class ApprovalFlowStep {
  @Prop({ required: true, min: 0 })
  order!: number;

  @Prop({ required: true, trim: true, default: '' })
  label!: string;

  @Prop({ required: true, trim: true, default: '' })
  postition!: string;

  @Prop({ trim: true, default: '' })
  reason!: string;

  @Prop({ required: true, trim: true, default: '' })
  performer!: string;

  @Prop({
    type: String,
    required: true,
    enum: FLOW_LOG_STATUS_VALUES,
    default: FlowLogStatus.PROCESSING,
  })
  status!: FlowLogStatus;

  @Prop({ default: '' })
  signedAt!: string;
}

export const ApprovalFlowStepSchema =
  SchemaFactory.createForClass(ApprovalFlowStep);
