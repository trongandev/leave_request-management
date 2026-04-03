import { Module } from '@nestjs/common';
import { DatabaseSeeder } from './database.seeder';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/users.schema';
import { Role, RoleSchema } from '../roles/roles.schema';
import {
  PermissionDoc,
  PermissionSchema,
} from '../permission/permission.schema';
import {
  Department,
  DepartmentSchema,
} from 'src/departments/departments.schema';
import { Position, PositionSchema } from 'src/positions/positions.schema';
import {
  FormTemplate,
  FormTemplateSchema,
} from '../form-template/form-template.schema';
import { Request, RequestSchema } from 'src/requests/requests.schema';
import {
  LeaveBalance,
  LeaveBalanceSchema,
} from 'src/leave-balances/leave-balances.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Position.name, schema: PositionSchema },
      { name: Role.name, schema: RoleSchema },
      { name: Department.name, schema: DepartmentSchema },
      { name: PermissionDoc.name, schema: PermissionSchema },
      { name: FormTemplate.name, schema: FormTemplateSchema },
      { name: Request.name, schema: RequestSchema },
      { name: LeaveBalance.name, schema: LeaveBalanceSchema },
    ]),
  ],
  providers: [DatabaseSeeder],
})
export class DatabaseModule {}
