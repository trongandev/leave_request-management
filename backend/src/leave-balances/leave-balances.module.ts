import { Module } from '@nestjs/common';
import { LeaveBalancesService } from './leave-balances.service';
import { LeaveBalancesController } from './leave-balances.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LeaveBalance, LeaveBalanceSchema } from './leave-balances.schema';
import {
  LeaveBalanceLog,
  LeaveBalanceLogsSchema,
} from './leave-balance-logs.schema';
import { User, UserSchema } from '../users/users.schema';
import { SystemSettingModule } from '../system-setting/system-setting.module';
import { LeaveBalancesCronService } from './leave-balances.cron.service';
import { Counter, CounterSchema } from '../counters/counters.schema';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    NotificationsModule,
    MongooseModule.forFeature([
      { name: LeaveBalance.name, schema: LeaveBalanceSchema },
      { name: LeaveBalanceLog.name, schema: LeaveBalanceLogsSchema },
      { name: User.name, schema: UserSchema },
      { name: Counter.name, schema: CounterSchema },
    ]),
    SystemSettingModule,
  ],
  controllers: [LeaveBalancesController],
  providers: [LeaveBalancesService, LeaveBalancesCronService],
  exports: [LeaveBalancesService],
})
export class LeaveBalancesModule {}
