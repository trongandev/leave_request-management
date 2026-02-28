import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Role extends Document {
  @Prop({ required: true, unique: true })
  name: string; // Ví dụ: 'Admin', 'HR',"Manager", 'Employee'

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PermissionDoc' }],
  })
  permissions: string[]; // Ví dụ: ['CREATE_LEAVE', 'APPROVE_LEAVE']
}

export const RoleSchema = SchemaFactory.createForClass(Role);
