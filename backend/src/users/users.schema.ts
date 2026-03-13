import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

// tự động xóa password và __v khi convert sang JSON
@Schema({
  timestamps: true,
  toJSON: {
    transform: (_doc: any, ret: Record<string, any>) => {
      delete ret.password;
      delete ret.__v;
      return ret;
    },
  },
})
export class User extends Document {
  @Prop({ unique: true })
  @ApiProperty({ example: 'EMP001', description: 'Mã nhân viên' })
  empId: string;

  @Prop({ required: true })
  @ApiProperty({ example: 'Nguyễn Văn A', description: 'Full name' })
  fullName: string;

  @Prop({ required: true, unique: true })
  @ApiProperty({
    example: 'nguyen.vana@example.com',
    description: 'Email đăng nhập (unique)',
  })
  email: string;

  @Prop({ required: true })
  @ApiProperty({
    example: 'hashedPassword123',
    description: 'Mật khẩu đã hash',
  })
  password: string;

  @Prop({ type: 'ObjectId', ref: 'User' })
  @ApiProperty({
    example: '',
    description: 'Tham chiếu tới người quản lý trực tiếp',
    required: false,
  })
  managerId?: string;

  @Prop({ type: 'ObjectId', ref: 'Role', required: true })
  @ApiProperty({
    example: '',
    description: 'Tham chiếu tới Role',
  })
  roleId: string;

  @Prop({ type: 'ObjectId', ref: 'Department' })
  @ApiProperty({
    example: '',
    description: 'Tham chiếu tới Department',
  })
  departmentId?: string;

  @ApiProperty({
    description: 'Hình ảnh',
  })
  avatar: string;

  @Prop({ type: 'ObjectId', ref: 'Position' })
  @ApiProperty({
    example: '',
    description: 'Tham chiếu tới Position',
  })
  positionId: string;

  @Prop({ default: 'male' })
  @ApiProperty({
    example: 'male',
    description: 'Giới tính',
  })
  gender: string;

  @Prop()
  @ApiProperty({
    required: true,
    example: new Date(),
    description: 'Ngày sinh',
  })
  birthDate: Date;

  @Prop({ required: true, default: true })
  @ApiProperty({
    example: true,
    description: 'Trạng thái người dùng',
    enum: [true, false],
  })
  status: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
