import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  collection: 'system_settings',
})
export class SystemSetting extends Document {
  @Prop({ required: true, unique: true, uppercase: true, trim: true })
  key!: string;

  @Prop({ required: true, type: Number })
  value!: number;

  @Prop({ default: '' })
  description?: string;
}

export const SystemSettingSchema = SchemaFactory.createForClass(SystemSetting);
