import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  NOTIFICATION_TYPE_ARRAY,
  NotificationType,
} from '../enum/notification-type.enum';

export type NotificationDocument = HydratedDocument<Notification>;

@Schema({
  timestamps: true,
  collection: 'notifications',
})
export class Notification {
  @Prop({ required: true })
  recipientId!: string;

  @Prop({ type: String, default: null })
  senderId!: string | null;

  // Explicit String type prevents Mongoose from treating enum object keys as nested schema paths.
  @Prop({ type: String, required: true, enum: NOTIFICATION_TYPE_ARRAY })
  type!: NotificationType;

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
NotificationSchema.index({ senderId: 1, createdAt: -1 });
