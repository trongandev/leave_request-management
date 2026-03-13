// counters.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CounterDocument = Counter & Document;

@Schema({ _id: false })
export class Counter {
  @Prop({ required: true, unique: true })
  _id: string;
  @Prop({ default: 0 })
  seq: number; // Số thứ tự hiện tại
}

export const CounterSchema = SchemaFactory.createForClass(Counter);
