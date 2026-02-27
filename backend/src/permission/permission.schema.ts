import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class PermissionDoc {
  @Prop({ required: true, unique: true })
  code: string; // Lưu giá trị của Enum (ví dụ: 'CREATE_LEAVE')

  @Prop()
  description: string;
}
export const PermissionSchema = SchemaFactory.createForClass(PermissionDoc);
