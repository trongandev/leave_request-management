import { Module } from '@nestjs/common';
import { DatabaseSeeder } from './database.seeder';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/users.schema';
import { Role, RoleSchema } from '../roles/roles.schema';
import {
  PermissionDoc,
  PermissionSchema,
} from '../permission/permission.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
    MongooseModule.forFeature([
      { name: PermissionDoc.name, schema: PermissionSchema },
    ]),
  ],
  providers: [DatabaseSeeder],
})
export class DatabaseModule {}
