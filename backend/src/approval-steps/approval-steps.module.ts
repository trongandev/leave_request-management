import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApprovalStepsService } from './approval-steps.service';
import { ApprovalStepsController } from './approval-steps.controller';
import { ApprovalStep, ApprovalStepSchema } from './approval-steps.schema';
import { DelegationsModule } from '../delegations/delegations.module';
import { Request, RequestSchema } from '../requests/requests.schema';
import {
  LeaveBalance,
  LeaveBalanceSchema,
} from '../leave-balances/leave-balances.schema';
import {
  FormTemplate,
  FormTemplateSchema,
} from '../form-template/form-template.schema';
import { NotificationsModule } from '../notifications/notifications.module';
import { Counter, CounterSchema } from '../counters/counters.schema';
import { ApprovalStepsFlowLogModule } from '../approval-steps-flow-log/approval-steps-flow-log.module';
import { PushNotiModule } from 'src/push-noti/push-noti.module';
import { MailService } from '../mail/mail.service';

@Module({
  imports: [
    DelegationsModule,
    NotificationsModule,
    ApprovalStepsFlowLogModule,
    MongooseModule.forFeature([
      { name: ApprovalStep.name, schema: ApprovalStepSchema },
      { name: Request.name, schema: RequestSchema },
      { name: LeaveBalance.name, schema: LeaveBalanceSchema },
      { name: FormTemplate.name, schema: FormTemplateSchema },
      { name: Counter.name, schema: CounterSchema },
    ]),
    PushNotiModule,
  ],
  controllers: [ApprovalStepsController],
  providers: [ApprovalStepsService, MailService],
  exports: [ApprovalStepsService, MongooseModule],
})
export class ApprovalStepsModule {}
