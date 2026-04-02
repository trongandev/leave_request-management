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

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
    MongooseModule.forFeature([
      { name: Position.name, schema: PositionSchema },
    ]),
    MongooseModule.forFeature([
      { name: Department.name, schema: DepartmentSchema },
    ]),
    MongooseModule.forFeature([
      { name: PermissionDoc.name, schema: PermissionSchema },
    ]),
    MongooseModule.forFeature([
      { name: FormTemplate.name, schema: FormTemplateSchema },
    ]),
    MongooseModule.forFeature([{ name: Request.name, schema: RequestSchema }]),
  ],
  providers: [DatabaseSeeder],
})
export class DatabaseModule {}
