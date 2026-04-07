import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false }) // Không cần tạo _id riêng cho từng field bên trong
export class FormField {
  @Prop({ required: true })
  id: string; // Key định danh (vd: amount_01) - Dùng để map với data khi submit

  @Prop({
    required: true,
  })
  type: string; //"text" | "number" | "date" | "textarea" | "select" | "radio" | "checkbox" | "file" | "container"

  @Prop({ required: true })
  label: string; // Tên hiển thị (vd: Số tiền, Lý do)

  @Prop()
  name: string;

  @Prop()
  note: string;

  @Prop()
  placeholder: string;

  @Prop({ default: false })
  required: boolean;

  @Prop({ default: false })
  readOnly: boolean;

  @Prop({ type: Object })
  validation: any;

  @Prop()
  defaultValue: string;

  @Prop({ type: Array })
  options: Array<{ label: string; value: string }>; //Thường dùng cho Select option, radio, và các giá trị mà cần chọn từ danh sách có sẵn

  @Prop({ default: 0 })
  order: number; //Dùng để sắp xếp vị trí của các phần tử trong Form

  @Prop({ default: null })
  parentId: string; //Dùng để render những ele nằm trong Container lên màn hình

  @Prop({ type: Object, default: { direction: 'col' } })
  layout: {
    direction: string; //Dùng để định dạng do type = container: ROW COL
  };
}

export const FormFieldSchema = SchemaFactory.createForClass(FormField);
