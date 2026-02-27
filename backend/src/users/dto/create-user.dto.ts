import { OmitType } from '@nestjs/swagger';
import { User } from '../users.schema';

// OmitType(User, ['status'])	Lấy tất cả fields trừ status
// PickType(User, ['email', 'password'])	Chỉ lấy một số fields được chỉ định
// PartialType(User)	Lấy tất cả fields nhưng đều optional
// IntersectionType(A, B)	Gộp 2 class lại

export class CreateUserDto extends OmitType(User, ['status'] as const) {}
