import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  collection: 'audit_logs',
})
export class AuditLog extends Document {
  @Prop({ required: true })
  userId!: string;

  @Prop({ required: true })
  action!: string;

  @Prop({ required: true })
  module!: string;

  @Prop()
  resourceId?: string;

  @Prop({ type: Object })
  oldValue?: Record<string, unknown>;

  @Prop({ type: Object })
  newValue?: Record<string, unknown>;

  @Prop()
  ipAddress?: string;

  @Prop()
  userAgent?: string;

  @Prop()
  description?: string;
}

export const AuditLogSchema = SchemaFactory.createForClass(AuditLog);

AuditLogSchema.index({ userId: 1, createdAt: -1 });
AuditLogSchema.index({ module: 1, action: 1, createdAt: -1 });
AuditLogSchema.index({ resourceId: 1, createdAt: -1 });
