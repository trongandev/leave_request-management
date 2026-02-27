import { PartialType } from '@nestjs/swagger';
import { User } from 'src/users/users.schema';

export class CreateRoleDto extends PartialType(User) {}
