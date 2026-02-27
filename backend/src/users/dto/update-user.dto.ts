import { PartialType } from '@nestjs/swagger';
import { User } from '../users.schema';

export class UpdateUserDto extends PartialType(User) {}
