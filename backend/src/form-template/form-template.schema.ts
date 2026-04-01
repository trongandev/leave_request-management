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
  vieName: string; // Tên đơn tiếng việt (vd: Đơn xin nghỉ phép, Đơn tạm ứng)

  @Prop({ required: true })
  engName: string; // Tên đơn tiếng anh (vd: Leave Application, Advance Payment Request)

  @Prop({ type: [FormField] }) // Mảng các trường đã kéo thả
  fields: FormField[];

  @Prop({ default: 1 })
  version: number;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ required: true })
  submitButtonText: string;

  @Prop({ default: false })
  autoApprove: boolean; // Nếu true thì khi nhân viên tạo yêu cầu sẽ tự động duyệt mà không cần qua cấp trên

  @Prop({ default: 0 })
  maxDays: number; // Số ngày tối đa cho phép (áp dụng cho đơn xin nghỉ phép)

  @Prop({ default: false })
  requireAttachment: boolean; // Có bắt buộc phải có file đính kèm hay không (áp dụng cho các đơn như xin nghỉ phép, tạm ứng...)

  @Prop({ default: false })
  isReductible: boolean; // không bị trừ phép, áp dụng cho các đơn như xin nghỉ ốm, nghỉ thai sản, nghỉ không lương, các đơn thanh toán tiền...
}

export const FormTemplateSchema = SchemaFactory.createForClass(FormTemplate);
