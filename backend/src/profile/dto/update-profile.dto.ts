import { PartialType } from '@nestjs/swagger';
import { User } from 'src/users/users.schema';

export class UpdateRoleDto extends PartialType(User) {}
