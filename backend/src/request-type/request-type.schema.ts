import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RequestTypeDocument = HydratedDocument<RequestType>;

@Schema({ collection: 'request_type', timestamps: true })
export class RequestType {
  @Prop({ type: Number, required: true, unique: true, index: true })
  req_typeId!: number;

  @Prop({ required: true, trim: true })
  name!: string;

  @Prop({ required: true, unique: true, uppercase: true, trim: true })
  code!: string;

  @Prop({ default: '', trim: true })
  desc!: string;

  @Prop({ type: Boolean, default: false })
  isDeductible!: boolean;

  @Prop({ type: Boolean, default: false })
  requireAttachment!: boolean;

  @Prop({ type: Number, default: 0, min: 0 })
  maxDays!: number;

  @Prop({ type: Boolean, default: false })
  autoApproval!: boolean;
}

export const RequestTypeSchema = SchemaFactory.createForClass(RequestType);
