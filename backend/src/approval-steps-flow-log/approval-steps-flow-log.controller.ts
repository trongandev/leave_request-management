import { Controller, Get, Param } from '@nestjs/common';
import { ApprovalStepsFlowLogService } from './approval-steps-flow-log.service';

@Controller('approval-steps-flow-log')
export class ApprovalStepsFlowLogController {
  constructor(
    private readonly approvalStepsFlowLogService: ApprovalStepsFlowLogService,
  ) {}

  @Get('request/:requestId')
  findByRequestId(@Param('requestId') requestId: string) {
    return this.approvalStepsFlowLogService.requireByRequestId(requestId);
  }
}
