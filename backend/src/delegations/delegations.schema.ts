import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'delegations' })
export class Delegation extends Document {
  @Prop({ required: true, unique: true, trim: true, immutable: true })
  dgtDisplayId!: string;

  @Prop({ type: 'ObjectId', ref: 'User', required: true })
  fromUserId!: string;

  @Prop({ type: 'ObjectId', ref: 'User', required: true })
  toUserId!: string;

  @Prop({ required: true })
  startDate!: Date;

  @Prop({ required: true })
  endDate!: Date;

  @Prop({ required: true, default: true })
  applyToAll!: boolean;

  @Prop({ type: [String], default: [] })
  specificTypeCode!: string[];

  @Prop({ required: true, default: true })
  isActive!: boolean;

  @Prop()
  reason?: string;

  @Prop({ type: 'ObjectId', ref: 'User' })
  creatorId?: string;
}

export const DelegationSchema = SchemaFactory.createForClass(Delegation);
DelegationSchema.index({ dgtDisplayId: 1 }, { unique: true });

DelegationSchema.index({ fromUserId: 1, startDate: 1, endDate: 1 });
DelegationSchema.index({ toUserId: 1, isActive: 1, startDate: 1, endDate: 1 });
