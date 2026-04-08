import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// ví dụ về rule workflow sequence mặc định, sẽ được khởi tạo khi tạo mới form template, sau đó người dùng có thể chỉnh sửa lại nếu muốn
/*
 const defaultRuleWorkflowSequence = [
    { id: `step_1`, idx: 1, label: "Quản lí trực tiếp", name: "Line Manager", specificUserId: "", timeExpected: "Within 24 hours" },
    { id: `step_2`, idx: 2, label: "Sếp của quản lí trực tiếp", name: "Upper Manager", specificUserId: "", timeExpected: "Within 24 hours" },
    { id: `step_3`, idx: 3, label: "Trưởng phòng", name: "Department Head", specificUserId: "", timeExpected: "Within 32 hours" },
    { id: `step_4`, idx: 4, label: "Chọn đích danh người cố định", name: "Specific Person", specificUserId: "", timeExpected: "Within 48 hours" },
    ]
*/

@Schema({ _id: false }) // Không cần tạo _id riêng cho từng field bên trong
export class RuleWorkflowSequence {
  @Prop({ required: true })
  id: string; // Key định danh

  @Prop({ required: true })
  idx: number; // Thứ tự step

  @Prop({ required: true })
  label: string;

  @Prop({ required: true })
  name: string;

  @Prop({ default: '' })
  specificUserId: string; // Nếu user chọn step_4 thì specificUserId sẽ là _id của user đó, mặc định là ''

  @Prop({ default: '' })
  timeExpected: string; // Thời gian dự kiến
}

export const RuleWorkflowSequenceSchema =
  SchemaFactory.createForClass(RuleWorkflowSequence);
