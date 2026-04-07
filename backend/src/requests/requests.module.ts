import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestSchema } from './requests.schema';
import { UsersModule } from '../users/users.module';
import { ApprovalStepsModule } from '../approval-steps/approval-steps.module';
import {
  LeaveBalance,
  LeaveBalanceSchema,
} from '../leave-balances/leave-balances.schema';
import {
  FormTemplate,
  FormTemplateSchema,
} from '../form-template/form-template.schema';
import {
  ApprovalStep,
  ApprovalStepSchema,
} from '../approval-steps/approval-steps.schema';
import { Counter, CounterSchema } from '../counters/counters.schema';
import { ApprovalStepsFlowLogModule } from '../approval-steps-flow-log/approval-steps-flow-log.module';

@Module({
  imports: [
    UsersModule,
    ApprovalStepsModule,
    ApprovalStepsFlowLogModule,
    MongooseModule.forFeature([
      { name: 'Request', schema: RequestSchema },
      { name: LeaveBalance.name, schema: LeaveBalanceSchema },
      { name: FormTemplate.name, schema: FormTemplateSchema },
      { name: ApprovalStep.name, schema: ApprovalStepSchema },
      { name: Counter.name, schema: CounterSchema },
    ]),
  ],
  controllers: [RequestsController],
  providers: [RequestsService],
})
export class RequestsModule {}
