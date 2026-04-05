import {
  Controller,
  Patch,
  Get,
  Param,
  Body,
  Query,
  HttpCode,
} from '@nestjs/common';
import { ApprovalStepsService } from './approval-steps.service';
import {
  ApproveApprovalStepDto,
  RejectApprovalStepDto,
  ReturnApprovalStepDto,
  DelegateApprovalStepDto,
  QueryPendingApprovalStepsDto,
} from './dto/approve-approval-step.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { RequirePermissions } from '../auth/decorators/permissions.decorator';
import { Permission } from '../enum/permission.enum';

@Controller('approval-steps')
export class ApprovalStepsController {
  constructor(private readonly approvalStepsService: ApprovalStepsService) {}

  // Get all approval steps
  @Get()
  @RequirePermissions(Permission.READ_OWN_LEAVE)
  findAll() {
    return this.approvalStepsService.findAll();
  }

  // Get pending approval steps for current user
  @Get('my-pending')
  @RequirePermissions(Permission.APPROVE_LEAVE)
  async getMyPending(
    @CurrentUser() user: any,
    @Query() query: QueryPendingApprovalStepsDto,
  ) {
    // This endpoint is the canonical inbox for approvers/delegates.
    return this.approvalStepsService.findPendingForApprover(user._id, query);
  }

  // Get approval steps by request ID
  @Get('request/:requestId')
  @RequirePermissions(Permission.READ_ALL_LEAVE)
  async getByRequestId(@Param('requestId') requestId: string) {
    // Used by detail screen/audit view to explain approval timeline.
    return this.approvalStepsService.findByRequestId(requestId);
  }

  // Get single approval step by ID
  @Get(':id')
  @RequirePermissions(Permission.READ_ALL_LEAVE)
  async findOne(@Param('id') id: string) {
    return this.approvalStepsService.findById(id);
  }

  // Approve an approval step
  @Patch(':id/approve')
  @HttpCode(200)
  @RequirePermissions(Permission.APPROVE_LEAVE)
  async approve(
    @Param('id') id: string,
    @Body() approveDto: ApproveApprovalStepDto,
    @CurrentUser() user: any,
  ) {
    return this.approvalStepsService.approve(id, approveDto, user);
  }

  // Reject an approval step
  @Patch(':id/reject')
  @HttpCode(200)
  @RequirePermissions(Permission.REJECT_LEAVE)
  async reject(
    @Param('id') id: string,
    @Body() rejectDto: RejectApprovalStepDto,
    @CurrentUser() user: any,
  ) {
    return this.approvalStepsService.reject(id, rejectDto, user);
  }

  // Return an approval step
  @Patch(':id/return')
  @HttpCode(200)
  @RequirePermissions(Permission.REJECT_LEAVE)
  async returnStep(
    @Param('id') id: string,
    @Body() returnDto: ReturnApprovalStepDto,
    @CurrentUser() user: any,
  ) {
    return this.approvalStepsService.returnStep(id, returnDto, user);
  }

  // Delegate an approval step to another approver
  @Patch(':id/delegate')
  @HttpCode(200)
  @RequirePermissions(Permission.FORWARD_LEAVE)
  async delegate(
    @Param('id') id: string,
    @Body() delegateDto: DelegateApprovalStepDto,
    @CurrentUser() user: any,
  ) {
    return this.approvalStepsService.delegate(id, delegateDto, user);
  }
}
