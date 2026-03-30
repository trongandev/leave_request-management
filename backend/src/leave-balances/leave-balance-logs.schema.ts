import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LeaveBalanceLogDocument = HydratedDocument<LeaveBalanceLog>;

@Schema({
  collection: 'leave_balance_log',
  timestamps: { createdAt: true, updatedAt: false },
})
export class LeaveBalanceLog {
  @Prop({ type: Number, required: true, unique: true })
  _id!: number;

  @Prop({ required: true, trim: true })
  userId!: string;

  @Prop({ trim: true, default: '' })
  requestId!: string;

  @Prop({ type: Number, required: true })
  changeAmount!: number;

  @Prop({ required: true, trim: true })
  reason!: string;

  createdAt?: Date;
}

export const LeaveBalanceLogsSchema =
  SchemaFactory.createForClass(LeaveBalanceLog);

LeaveBalanceLogsSchema.index({ userId: 1, createdAt: -1 });
LeaveBalanceLogsSchema.index({ requestId: 1 });
