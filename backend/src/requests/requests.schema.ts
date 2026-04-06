import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  RequestStatus,
  REQUEST_STATUS_ARRAY,
} from 'src/enum/request-status.enum';

@Schema({
  timestamps: true,
  collection: 'requests',
})
export class Request extends Document {
  @Prop({ required: true, unique: true, trim: true, immutable: true })
  reqDisplayId!: string;

  @Prop({ type: 'ObjectId', ref: 'User', required: true })
  creatorId!: string;

  @Prop({ type: 'ObjectId', ref: 'FormTemplate', required: true })
  formTemplateId!: string;

  @Prop({ required: true })
  code!: string;

  @Prop({ required: true })
  title!: string;

  @Prop({ type: Object, required: true, default: {} })
  values!: Record<string, unknown>;

  @Prop({
    type: String,
    required: true,
    enum: REQUEST_STATUS_ARRAY,
    default: RequestStatus.PENDING,
  })
  status!: RequestStatus;

  @Prop({ required: true, default: 0 })
  currentStepOrder!: number;
}

export const RequestSchema = SchemaFactory.createForClass(Request);
RequestSchema.index({ reqDisplayId: 1 }, { unique: true });
RequestSchema.index({ creatorId: 1, createdAt: -1 });
RequestSchema.index({ formTemplateId: 1, createdAt: -1 });
RequestSchema.index({ status: 1, createdAt: -1 });
