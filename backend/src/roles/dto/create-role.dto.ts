import { PartialType } from '@nestjs/swagger';
import { User } from '../../users/users.schema';

export class CreateRoleDto extends PartialType(User) {}
