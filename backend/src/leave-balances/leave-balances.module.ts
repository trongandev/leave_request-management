import { Module } from '@nestjs/common';
import { LeaveBalancesService } from './leave-balances.service';
import { LeaveBalancesController } from './leave-balances.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LeaveBalance, LeaveBalanceSchema } from './leave-balances.schema';
import { User, UserSchema } from '../users/users.schema';
import { SystemSettingModule } from '../system-setting/system-setting.module';
import { LeaveBalancesCronService } from './leave-balances.cron.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LeaveBalance.name, schema: LeaveBalanceSchema },
      { name: User.name, schema: UserSchema },
    ]),
    SystemSettingModule,
  ],
  controllers: [LeaveBalancesController],
  providers: [LeaveBalancesService, LeaveBalancesCronService],
  exports: [LeaveBalancesService],
})
export class LeaveBalancesModule {}
