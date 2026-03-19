import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Department extends Document {
  @Prop({ required: true })
  originName: string; // Tên gốc của phòng ban (tiếng anh)
  name: string; // Tên phòng ban (VD: Kỹ thuật) (tiếng việt)

  @Prop({ required: true, unique: true })
  code: string; // Mã phòng ban (VD: TECH, HR, FIN)

  @Prop()
  description: string;
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);
