import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
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

  @Prop({ required: true, default: true })
  @ApiProperty({
    example: true,
    description: 'Trạng thái người dùng',
    enum: [true, false],
  })
  status: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
