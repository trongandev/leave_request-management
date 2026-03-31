import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { FormField } from './field.schema';

@Schema({ timestamps: true })
export class FormTemplate extends Document {
  @Prop({ type: 'ObjectId', ref: 'User', required: true })
  userId: string; // người làm mẫu đơn, thường là người tạo ra mẫu đơn đó

  @Prop({ required: true, unique: true })
  code: string; // Mã đơn (vd: LEAVE_APP, ADVANCE_PAYMENT)

  @Prop({ required: true })
  name: string; // Tên đơn (vd: Đơn xin nghỉ phép, Đơn tạm ứng)

  @Prop({ type: [FormField] }) // Mảng các trường đã kéo thả
  fields: FormField[];

  @Prop({ default: 1 })
  version: number;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: Object, default: {} })
  settings: {
    submitButtonText?: string;
    allowAttachment?: boolean;
  };
}

export const FormTemplateSchema = SchemaFactory.createForClass(FormTemplate);
