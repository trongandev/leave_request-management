import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApprovalStepsFlowLogService } from './approval-steps-flow-log.service';
import { ApprovalStepsFlowLogController } from './approval-steps-flow-log.controller';
import {
  ApprovalStepsFlowLog,
  ApprovalStepsFlowLogSchema,
} from './approval-steps-flow-log.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ApprovalStepsFlowLog.name, schema: ApprovalStepsFlowLogSchema },
    ]),
  ],
  controllers: [ApprovalStepsFlowLogController],
  providers: [ApprovalStepsFlowLogService],
  exports: [ApprovalStepsFlowLogService],
})
export class ApprovalStepsFlowLogModule {}
