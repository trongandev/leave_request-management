import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Role extends Document {
  @Prop({ required: true, unique: true })
  name: string; // Ví dụ: 'Admin', 'HR',"Manager", 'Employee'

  @Prop([String])
  permissions: string[]; // Ví dụ: ['CREATE_LEAVE', 'APPROVE_LEAVE']
}

export const RoleSchema = SchemaFactory.createForClass(Role);
