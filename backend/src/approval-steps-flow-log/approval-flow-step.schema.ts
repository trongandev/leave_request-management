import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class ApprovalFlowStep {
  @Prop({ required: true, min: 0 })
  order!: number;

  @Prop({ required: true, trim: true, default: '' })
  label!: string;

  @Prop({ required: true, trim: true, default: '' })
  postition!: string;

  @Prop({ required: true, trim: true, default: '' })
  reason!: string;

  @Prop({ required: true, trim: true, default: '' })
  performer!: string;

  @Prop({ default: '' })
  signedAt!: string;
}

export const ApprovalFlowStepSchema =
  SchemaFactory.createForClass(ApprovalFlowStep);
