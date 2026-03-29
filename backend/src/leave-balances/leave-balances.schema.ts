import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  collection: 'leave_balances',
})
export class LeaveBalance extends Document {
  @Prop({ type: 'ObjectId', ref: 'User', required: true })
  userId!: string;

  @Prop({ required: true, min: 2000 })
  year!: number;

  @Prop({ required: true, default: 0, min: 0 })
  baseDays!: number;

  @Prop({ required: true, default: 0, min: 0 })
  seniorityDays!: number;

  @Prop({ required: true, default: 0 })
  adjustedDays!: number;

  @Prop({ required: true, default: 0, min: 0 })
  totalDays!: number;

  @Prop({ required: true, default: 0, min: 0 })
  usedDays!: number;

  @Prop({ required: true, default: 0, min: 0 })
  remainingDays!: number;
}

export const LeaveBalanceSchema = SchemaFactory.createForClass(LeaveBalance);
LeaveBalanceSchema.index({ userId: 1, year: 1 }, { unique: true });
LeaveBalanceSchema.index({ year: 1 });
