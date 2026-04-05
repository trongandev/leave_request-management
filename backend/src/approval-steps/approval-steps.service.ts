import {
  Injectable,
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ApprovalStep } from './approval-steps.schema';
import { CreateApprovalStepDto } from './dto/create-approval-step.dto';
import {
  ApproveApprovalStepDto,
  RejectApprovalStepDto,
  ReturnApprovalStepDto,
  DelegateApprovalStepDto,
  QueryPendingApprovalStepsDto,
} from './dto/approve-approval-step.dto';
import { ApprovalStepStatus } from '../enum/approval-step-status.enum';
import { DelegationsService } from '../delegations/delegations.service';
import { ApprovalStepInput } from './policies/types';
import { Request } from '../requests/requests.schema';
import { RequestStatus } from '../enum/request-status.enum';
import { LeaveBalance } from '../leave-balances/leave-balances.schema';
import { FormTemplate } from '../form-template/form-template.schema';

type RequestActor = {
  _id?: string;
  roleId?: {
    name?: string;
  };
};

@Injectable()
export class ApprovalStepsService {
  // This service is the approval-state engine.
  // Each action (approve/reject/return/delegate) updates both step state and request aggregate state.
  // Request status should never be manually changed elsewhere without syncing this state machine.
  private readonly UNASSIGNED_STEP_LABEL = 'UNASSIGNED_TIMEOUT_RETURN';

  constructor(
    @InjectModel(ApprovalStep.name)
    private readonly approvalStepModel: Model<ApprovalStep>,
    @InjectModel(Request.name)
    private readonly requestModel: Model<Request>,
    @InjectModel(LeaveBalance.name)
    private readonly leaveBalanceModel: Model<LeaveBalance>,
    @InjectModel(FormTemplate.name)
    private readonly formTemplateModel: Model<FormTemplate>,
    private readonly delegationsService: DelegationsService,
  ) {}

  // Get all approval steps
  async findAll(): Promise<ApprovalStep[]> {
    return this.approvalStepModel.find().sort({ createdAt: -1 }).exec();
  }

  // Create approval step for a request

  async create(
    createApprovalStepDto: CreateApprovalStepDto,
  ): Promise<ApprovalStep> {
    const newStep = new this.approvalStepModel({
      ...createApprovalStepDto,
      status: createApprovalStepDto.status ?? ApprovalStepStatus.PENDING,
      groupId: createApprovalStepDto.groupId ?? [],
      requiredAll: createApprovalStepDto.requiredAll ?? true,
      isFinalStep: createApprovalStepDto.isFinalStep ?? false,
    });

    return newStep.save();
  }

  // Create multiple approval steps in batch (used during request creation flow)
  async createBatch(stepsDto: ApprovalStepInput[]): Promise<any[]> {
    const steps = stepsDto.map((dto) => ({
      ...dto,
      status: ApprovalStepStatus.PENDING,
      groupId: dto.groupId ?? [],
      requiredAll: dto.requiredAll ?? true,
      isFinalStep: dto.isFinalStep ?? false,
    }));

    return this.approvalStepModel.insertMany(steps);
  }

  // Get pending approval steps for a specific approver
  async findPendingForApprover(
    approverId: string,
    query?: QueryPendingApprovalStepsDto,
  ): Promise<ApprovalStep[]> {
    // Approver inbox includes:
    // - direct assignment (originalApproverId)
    // - parallel/group assignment (groupId)
    // - delegated assignment (actualApproverId)
    const delegatedFromUserIds =
      await this.delegationsService.findDelegatorsByDelegatee(
        approverId,
        query?.requestTypeCode,
      );

    const approverCandidates = [
      ...new Set([approverId, ...delegatedFromUserIds]),
    ];

    const filter: Record<string, any> = {
      $or: [
        { originalApproverId: { $in: approverCandidates } },
        { groupId: { $in: approverCandidates } },
        { actualApproverId: approverId },
      ],
      status: {
        $in: [ApprovalStepStatus.PENDING, ApprovalStepStatus.DELEGATED],
      },
    };

    if (query?.stepLabel) {
      filter.stepLabel = query.stepLabel;
    }

    if (query?.status) {
      filter.status = query.status;
    }

    if (typeof query?.isFinalStep === 'boolean') {
      filter.isFinalStep = query.isFinalStep;
    }

    return this.approvalStepModel
      .find(filter)
      .sort({ deadlineAt: 1 })
      .skip(query?.skip || 0)
      .limit(query?.take || 50)
      .exec();
  }

  // Get all pending steps for a request
  async findPendingForRequest(requestId: string): Promise<ApprovalStep[]> {
    return this.approvalStepModel
      .find({
        requestId,
        status: {
          $in: [ApprovalStepStatus.PENDING, ApprovalStepStatus.DELEGATED],
        },
      })
      .sort({ stepOrder: 1 })
      .exec();
  }

  // Approve an approval step
  async approve(
    stepId: string,
    approveDto: ApproveApprovalStepDto,
    actor: RequestActor,
  ): Promise<ApprovalStep> {
    const step = await this.findById(stepId);

    if (!step) {
      throw new NotFoundException(`Approval step ${stepId} not found`);
    }

    const canHandle = await this.canActorHandleStep(step, actor);
    if (!canHandle) {
      throw new ForbiddenException(
        'Only assigned approver, delegated approver or ADMIN can approve this step',
      );
    }

    if (
      ![ApprovalStepStatus.PENDING, ApprovalStepStatus.DELEGATED].includes(
        step.status,
      )
    ) {
      throw new ForbiddenException(
        `Cannot approve step with status ${step.status}`,
      );
    }

    step.status = ApprovalStepStatus.APPROVED;
    step.actualApproverId = String(actor._id);
    step.comment = approveDto.comment;
    step.signedAt = approveDto.signedAt
      ? new Date(approveDto.signedAt)
      : new Date();
    step.signatureUrl = approveDto.signatureUrl;

    const savedStep = await step.save();
    await this.resolveParallelGroupAfterApprove(savedStep, String(actor._id));
    await this.syncRequestStatus(String(savedStep.requestId));
    return savedStep;
  }

  // Reject an approval step
  async reject(
    stepId: string,
    rejectDto: RejectApprovalStepDto,
    actor: RequestActor,
  ): Promise<ApprovalStep> {
    const step = await this.findById(stepId);

    if (!step) {
      throw new NotFoundException(`Approval step ${stepId} not found`);
    }

    const canHandle = await this.canActorHandleStep(step, actor);
    if (!canHandle) {
      throw new ForbiddenException(
        'Only assigned approver, delegated approver or ADMIN can reject this step',
      );
    }

    if (
      ![ApprovalStepStatus.PENDING, ApprovalStepStatus.DELEGATED].includes(
        step.status,
      )
    ) {
      throw new ForbiddenException(
        `Cannot reject step with status ${step.status}`,
      );
    }

    step.status = ApprovalStepStatus.REJECTED;
    step.actualApproverId = String(actor._id);
    step.comment = rejectDto.reason;
    step.signedAt = rejectDto.signedAt
      ? new Date(rejectDto.signedAt)
      : new Date();
    step.signatureUrl = rejectDto.signatureUrl;

    const savedStep = await step.save();
    await this.closeActiveStepsAfterReject(savedStep);
    await this.syncRequestStatus(String(savedStep.requestId));
    return savedStep;
  }

  async returnStep(
    stepId: string,
    returnDto: ReturnApprovalStepDto,
    actor: RequestActor,
  ): Promise<ApprovalStep> {
    const step = await this.findById(stepId);

    if (!step) {
      throw new NotFoundException(`Approval step ${stepId} not found`);
    }

    const canHandle = await this.canActorHandleStep(step, actor);
    if (!canHandle) {
      throw new ForbiddenException(
        'Only assigned approver, delegated approver or ADMIN can return this step',
      );
    }

    if (
      ![ApprovalStepStatus.PENDING, ApprovalStepStatus.DELEGATED].includes(
        step.status,
      )
    ) {
      throw new ForbiddenException(
        `Cannot return step with status ${step.status}`,
      );
    }

    step.status = ApprovalStepStatus.RETURNED;
    step.actualApproverId = String(actor._id);
    step.comment = returnDto.reason;
    step.signedAt = returnDto.signedAt
      ? new Date(returnDto.signedAt)
      : new Date();

    const savedStep = await step.save();
    await this.syncRequestStatus(String(savedStep.requestId));
    return savedStep;
  }

  // Delegate approval to another approver
  async delegate(
    stepId: string,
    delegateDto: DelegateApprovalStepDto,
    actor: RequestActor,
  ): Promise<ApprovalStep> {
    const step = await this.findById(stepId);

    if (!step) {
      throw new NotFoundException(`Approval step ${stepId} not found`);
    }

    const canHandle = await this.canActorHandleStep(step, actor);
    if (!canHandle) {
      throw new ForbiddenException(
        'Only assigned approver, delegated approver or ADMIN can delegate this step',
      );
    }

    if (step.status !== ApprovalStepStatus.PENDING) {
      throw new ForbiddenException(
        `Cannot delegate step with status ${step.status}`,
      );
    }

    step.status = ApprovalStepStatus.DELEGATED;
    step.actualApproverId = delegateDto.delegateToUserId;
    step.delegationId = delegateDto.delegationId;
    step.comment = delegateDto.reason;

    if (delegateDto.newDeadlineAt) {
      step.deadlineAt = new Date(delegateDto.newDeadlineAt);
    }

    const savedStep = await step.save();
    await this.syncRequestStatus(String(savedStep.requestId));
    return savedStep;
  }

  // Get single approval step by ID

  async findById(id: string): Promise<ApprovalStep | null> {
    return this.approvalStepModel.findById(id).exec();
  }

  // Get all approval steps by request ID
  async findByRequestId(requestId: string): Promise<ApprovalStep[]> {
    return this.approvalStepModel
      .find({ requestId })
      .sort({ stepOrder: 1 })
      .exec();
  }

  async deleteByRequestId(requestId: string): Promise<number> {
    const result = await this.approvalStepModel
      .deleteMany({ requestId })
      .exec();
    return result.deletedCount ?? 0;
  }

  async returnByRequestId(requestId: string, comment: string): Promise<number> {
    const now = new Date();

    const result = await this.approvalStepModel
      .updateMany(
        {
          requestId,
          status: {
            $in: [ApprovalStepStatus.PENDING, ApprovalStepStatus.DELEGATED],
          },
        },
        {
          $set: {
            status: ApprovalStepStatus.RETURNED,
            comment,
            signedAt: now,
          },
        },
      )
      .exec();

    return result.modifiedCount ?? 0;
  }

  // Check if all required steps for a request are approved
  async isRequestFullyApproved(requestId: string): Promise<boolean> {
    const pendingSteps = await this.approvalStepModel.find({
      requestId,
      status: {
        $in: [ApprovalStepStatus.PENDING, ApprovalStepStatus.DELEGATED],
      },
    });

    return pendingSteps.length === 0;
  }

  // Check if any step for a request has been rejected
  async hasRejectedSteps(requestId: string): Promise<boolean> {
    const rejectedStep = await this.approvalStepModel.findOne({
      requestId,
      status: ApprovalStepStatus.REJECTED,
    });

    return !!rejectedStep;
  }

  @Cron(CronExpression.EVERY_30_MINUTES)
  async returnExpiredUnassignedSteps(): Promise<void> {
    const now = new Date();

    const expiredSteps = await this.approvalStepModel
      .find({
        stepLabel: this.UNASSIGNED_STEP_LABEL,
        status: {
          $in: [ApprovalStepStatus.PENDING, ApprovalStepStatus.DELEGATED],
        },
        deadlineAt: { $lte: now },
      })
      .select('_id requestId stepOrder')
      .lean()
      .exec();

    if (expiredSteps.length === 0) {
      return;
    }

    const stepIds = expiredSteps.map((step) => step._id);
    const requestIds = [
      ...new Set(expiredSteps.map((step) => String(step.requestId))),
    ];

    await this.approvalStepModel
      .updateMany(
        {
          _id: { $in: stepIds },
          status: {
            $in: [ApprovalStepStatus.PENDING, ApprovalStepStatus.DELEGATED],
          },
        },
        {
          $set: {
            status: ApprovalStepStatus.RETURNED,
            comment:
              'System auto-returned after deadline because no valid approver was found',
            signedAt: now,
          },
        },
      )
      .exec();

    await this.requestModel
      .updateMany(
        { _id: { $in: requestIds } },
        {
          $set: {
            status: RequestStatus.RETURNED,
            currentStepOrder: 1,
          },
        },
      )
      .exec();
  }

  private async syncRequestStatus(requestId: string): Promise<void> {
    // Priority rule:
    // rejected/returned step => request returned;
    // no active steps => request approved;
    // otherwise request pending at the smallest active stepOrder.
    const steps = await this.approvalStepModel
      .find({ requestId })
      .sort({ stepOrder: 1 })
      .exec();

    if (steps.length === 0) {
      return;
    }

    const rejectedStep = steps.find(
      (step) => step.status === ApprovalStepStatus.REJECTED,
    );
    if (rejectedStep) {
      await this.requestModel.findByIdAndUpdate(requestId, {
        status: RequestStatus.RETURNED,
        currentStepOrder: rejectedStep.stepOrder,
      });
      return;
    }

    const returnedStep = steps.find(
      (step) => step.status === ApprovalStepStatus.RETURNED,
    );
    if (returnedStep) {
      await this.requestModel.findByIdAndUpdate(requestId, {
        status: RequestStatus.RETURNED,
        currentStepOrder: returnedStep.stepOrder,
      });
      return;
    }

    const activeSteps = steps.filter((step) =>
      [ApprovalStepStatus.PENDING, ApprovalStepStatus.DELEGATED].includes(
        step.status,
      ),
    );

    if (activeSteps.length === 0) {
      const request = await this.requestModel.findById(requestId).exec();
      if (request) {
        await this.deductLeaveBalanceIfNeeded(request);
      }

      await this.requestModel.findByIdAndUpdate(requestId, {
        status: RequestStatus.APPROVED,
        currentStepOrder: steps[steps.length - 1]?.stepOrder ?? 1,
      });
      return;
    }

    await this.requestModel.findByIdAndUpdate(requestId, {
      status: RequestStatus.PENDING,
      currentStepOrder: Math.min(...activeSteps.map((step) => step.stepOrder)),
    });
  }

  private extractApprovalAmount(
    values?: Record<string, unknown>,
  ): number | undefined {
    if (!values || typeof values !== 'object') {
      return undefined;
    }

    const rawAmount = values.totalDays ?? values.amount;

    if (typeof rawAmount === 'number' && Number.isFinite(rawAmount)) {
      return rawAmount;
    }

    if (typeof rawAmount === 'string' && rawAmount.trim() !== '') {
      const parsed = Number(rawAmount);
      return Number.isFinite(parsed) ? parsed : undefined;
    }

    return undefined;
  }

  private resolveLeaveBalanceYear(values?: Record<string, unknown>): number {
    const dateCandidate =
      values?.fromDate ?? values?.startDate ?? values?.submissionDate;

    if (typeof dateCandidate === 'string' || dateCandidate instanceof Date) {
      const parsedDate = new Date(dateCandidate);
      if (!Number.isNaN(parsedDate.getTime())) {
        return parsedDate.getFullYear();
      }
    }

    return new Date().getFullYear();
  }

  private async shouldDeductLeaveBalance(request: Request): Promise<boolean> {
    const template = await this.formTemplateModel
      .findById(request.formTemplateId)
      .select('isReductible')
      .lean<{ isReductible?: boolean }>()
      .exec();

    if (template && typeof template.isReductible === 'boolean') {
      return template.isReductible;
    }

    const normalizedType = String(request.code ?? '').toUpperCase();
    return (
      normalizedType.includes('LEAVE') &&
      !normalizedType.includes('RESIGNATION')
    );
  }

  private async deductLeaveBalanceIfNeeded(request: Request): Promise<void> {
    // Deduct after full approval, using final request payload (totalDays/amount).
    if (!(await this.shouldDeductLeaveBalance(request))) {
      return;
    }

    const requestedDays = this.extractApprovalAmount(request.values);
    if (!requestedDays || requestedDays <= 0) {
      return;
    }

    const year = this.resolveLeaveBalanceYear(request.values);

    const balance = await this.leaveBalanceModel
      .findOne({ userId: String(request.creatorId), year })
      .select('usedDays remainingDays')
      .exec();

    if (!balance) {
      throw new BadRequestException(
        `Không tìm thấy leave balance cho năm ${year}`,
      );
    }

    const currentRemaining = Number(balance.remainingDays ?? 0);
    if (currentRemaining < requestedDays) {
      throw new BadRequestException(
        `Số dư nghỉ phép không đủ để trừ. Còn lại ${currentRemaining} ngày, cần trừ ${requestedDays} ngày`,
      );
    }

    const currentUsed = Number(balance.usedDays ?? 0);
    balance.usedDays = currentUsed + requestedDays;
    balance.remainingDays = currentRemaining - requestedDays;
    await balance.save();
  }

  private async resolveParallelGroupAfterApprove(
    step: ApprovalStep,
    actorId: string,
  ): Promise<void> {
    // For parallel steps with requiredAll = false, one approval can close the whole group.
    const groupMatcher = this.buildParallelGroupMatcher(step);

    if (!groupMatcher || step.requiredAll) {
      return;
    }

    await this.approvalStepModel
      .updateMany(
        {
          ...groupMatcher,
          _id: { $ne: step._id },
          status: {
            $in: [ApprovalStepStatus.PENDING, ApprovalStepStatus.DELEGATED],
          },
        },
        {
          $set: {
            status: ApprovalStepStatus.APPROVED,
            comment:
              step.comment ??
              `Auto-approved by parallel rule after approver ${actorId} signed`,
            signedAt: step.signedAt ?? new Date(),
            actualApproverId: step.actualApproverId ?? actorId,
            signatureUrl: step.signatureUrl,
          },
        },
      )
      .exec();
  }

  private async closeActiveStepsAfterReject(
    rejectedStep: ApprovalStep,
  ): Promise<void> {
    await this.approvalStepModel
      .updateMany(
        {
          requestId: rejectedStep.requestId,
          _id: { $ne: rejectedStep._id },
          status: {
            $in: [ApprovalStepStatus.PENDING, ApprovalStepStatus.DELEGATED],
          },
        },
        {
          $set: {
            status: ApprovalStepStatus.RETURNED,
            comment:
              rejectedStep.comment ??
              'Auto-returned after another approval step rejected this request',
            signedAt: rejectedStep.signedAt ?? new Date(),
          },
        },
      )
      .exec();
  }

  private buildParallelGroupMatcher(
    step: ApprovalStep,
  ): Record<string, any> | null {
    const members = [...new Set((step.groupId ?? []).map(String))].filter(
      Boolean,
    );

    if (members.length < 2) {
      return null;
    }

    return {
      requestId: step.requestId,
      stepOrder: step.stepOrder,
      requiredAll: step.requiredAll,
      groupId: {
        $all: members,
        $size: members.length,
      },
    };
  }

  private async canActorHandleStep(
    step: ApprovalStep,
    actor: RequestActor,
  ): Promise<boolean> {
    // Access rule for approval actions:
    // - ADMIN always allowed
    // - requester is never allowed to handle their own step
    // - assigned/group/delegated actors are allowed
    // - active delegation relationship can also grant permission
    if (!actor?._id) {
      return false;
    }

    const actorId = String(actor._id);

    if (actor.roleId?.name === 'ADMIN') {
      return true;
    }

    const request = await this.requestModel
      .findById(step.requestId)
      .select('creatorId status')
      .lean<{ creatorId?: unknown; status?: string }>()
      .exec();

    if (!request) {
      return false;
    }

    if (String(request.creatorId) === actorId) {
      return false;
    }

    const isAssignedApprover =
      step.originalApproverId?.toString() === actorId ||
      step.actualApproverId?.toString() === actorId ||
      (step.groupId ?? []).map(String).includes(actorId);

    if (isAssignedApprover) {
      return true;
    }

    const delegationOwners: string[] = [
      step.originalApproverId?.toString(),
      ...(step.groupId ?? []).map(String),
    ].filter(Boolean);

    for (const ownerId of delegationOwners) {
      const canAct = await this.delegationsService.canActOnBehalf(
        ownerId,
        actorId,
      );
      if (canAct) {
        return true;
      }
    }

    return false;
  }
}
