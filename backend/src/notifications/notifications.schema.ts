import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  collection: 'notifications',
})
export class Notification extends Document {
  @Prop({ required: true })
  recipientId!: string;

  @Prop({ required: true })
  senderId!: string;

  @Prop({ required: true })
  type!: string;

  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  content!: string;

  @Prop()
  link?: string;

  @Prop({ required: true, default: false })
  isRead!: boolean;

  @Prop({ type: Object, default: {} })
  metadata!: Record<string, unknown>;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);

NotificationSchema.index({ recipientId: 1, isRead: 1, createdAt: -1 });
NotificationSchema.index({ type: 1, createdAt: -1 });
