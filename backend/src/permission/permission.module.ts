import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PermissionDoc, PermissionSchema } from './permission.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PermissionDoc.name, schema: PermissionSchema },
    ]),
  ],
  controllers: [PermissionController],
  providers: [PermissionService],
})
export class PermissionModule {}
