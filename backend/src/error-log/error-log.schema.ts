import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) // Tự động thêm createdAt, updatedAt
export class ErrorLog extends Document {
  @Prop()
  path: string;

  @Prop()
  method: string;

  @Prop()
  statusCode: number;

  @Prop({ type: Object })
  message: any;

  @Prop()
  stack: string; // Lưu dấu vết lỗi (chỉ dùng để xem nội bộ)
}

export const ErrorLogSchema = SchemaFactory.createForClass(ErrorLog);
