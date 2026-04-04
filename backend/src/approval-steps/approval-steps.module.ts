import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApprovalStepsService } from './approval-steps.service';
import { ApprovalStepsController } from './approval-steps.controller';
import { ApprovalStep, ApprovalStepSchema } from './approval-steps.schema';
import { ApproverResolutionPolicy } from './policies/approver-resolution.policy';
import { ApprovalOrchestratorService } from './policies/approval-orchestrator.service';
import { DelegationsModule } from '../delegations/delegations.module';
import { Request, RequestSchema } from '../requests/requests.schema';
import { LeaveBalance, LeaveBalanceSchema } from '../leave-balances/leave-balances.schema';
import { FormTemplate, FormTemplateSchema } from '../form-template/form-template.schema';

@Module({
  imports: [
    DelegationsModule,
    MongooseModule.forFeature([
      { name: ApprovalStep.name, schema: ApprovalStepSchema },
      { name: Request.name, schema: RequestSchema },
      { name: LeaveBalance.name, schema: LeaveBalanceSchema },
      { name: FormTemplate.name, schema: FormTemplateSchema },
    ]),
  ],
  controllers: [ApprovalStepsController],
  providers: [
    ApprovalStepsService,
    ApproverResolutionPolicy,
    ApprovalOrchestratorService,
  ],
  exports: [
    ApprovalStepsService,
    ApproverResolutionPolicy,
    ApprovalOrchestratorService,
    MongooseModule,
  ],
})
export class ApprovalStepsModule {}
