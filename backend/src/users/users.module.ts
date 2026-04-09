import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './users.schema';
import { ConfigModule } from '@nestjs/config';
import { Counter, CounterSchema } from 'src/counters/counters.schema';
import { Role, RoleSchema } from 'src/roles/roles.schema';
import {
  Department,
  DepartmentSchema,
} from 'src/departments/departments.schema';
import { Position, PositionSchema } from 'src/positions/positions.schema';
import { LeaveBalancesModule } from '../leave-balances/leave-balances.module';
import { Request, RequestSchema } from 'src/requests/requests.schema';
import { PushNotiModule } from 'src/push-noti/push-noti.module';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Counter.name, schema: CounterSchema },
      { name: Role.name, schema: RoleSchema },
      { name: Department.name, schema: DepartmentSchema },
      { name: Position.name, schema: PositionSchema },
      { name: Request.name, schema: RequestSchema },
    ]),
    LeaveBalancesModule,
    PushNotiModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
