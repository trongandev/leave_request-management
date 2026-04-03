import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestSchema } from './requests.schema';
import { UsersModule } from '../users/users.module';
import { ApprovalStepsModule } from '../approval-steps/approval-steps.module';
import { LeaveBalance, LeaveBalanceSchema } from '../leave-balances/leave-balances.schema';

@Module({
  imports: [
    UsersModule,
    ApprovalStepsModule,
    MongooseModule.forFeature([
      { name: 'Request', schema: RequestSchema },
      { name: LeaveBalance.name, schema: LeaveBalanceSchema },
    ]),
  ],
  controllers: [RequestsController],
  providers: [RequestsService],
})
export class RequestsModule {}
