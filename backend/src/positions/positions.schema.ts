import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Position extends Document {
  @Prop({ required: true, unique: true })
  name: string; // Tên tiếng Anh viết tắt (VD: SWE, HR, PM)

  @Prop({ required: true })
  fullName: string; // Tên tiếng Anh đầy đủ (VD: Software Engineer)

  @Prop({ required: true })
  level: number; // Cấp bậc từ 1-8

  @Prop({ required: true })
  description: string; // Tên dịch qua tiếng Việt (VD: Kỹ sư phần mềm)

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true,
  })
  departmentId: string;
}
export const PositionSchema = SchemaFactory.createForClass(Position);
