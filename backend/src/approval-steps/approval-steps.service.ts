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
import { NotificationsService } from '../notifications/notifications.service';
import { Counter } from '../counters/counters.schema';
import { ApprovalStepsFlowLogService } from '../approval-steps-flow-log/approval-steps-flow-log.service';
import { paginate } from 'src/common/utils/pagination.util';

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
    @InjectModel(Counter.name)
    private readonly counterModel: Model<Counter>,
    @InjectModel(Request.name)
    private readonly requestModel: Model<Request>,
    @InjectModel(LeaveBalance.name)
    private readonly leaveBalanceModel: Model<LeaveBalance>,
    @InjectModel(FormTemplate.name)
    private readonly formTemplateModel: Model<FormTemplate>,
    private readonly delegationsService: DelegationsService,
    private readonly notificationsService: NotificationsService,
    private readonly approvalStepsFlowLogService: ApprovalStepsFlowLogService,
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
      apsDisplayId: await this.generateDisplayId(),
      status: createApprovalStepDto.status ?? ApprovalStepStatus.PENDING,
      groupId: createApprovalStepDto.groupId ?? [],
      requiredAll: createApprovalStepDto.requiredAll ?? true,
      isFinalStep: createApprovalStepDto.isFinalStep ?? false,
    });

    return newStep.save();
  }

  // Create multiple approval steps in batch (used during request creation flow)
  async createBatch(stepsDto: ApprovalStepInput[]): Promise<any[]> {
    const steps: Record<string, any>[] = [];

    for (const dto of stepsDto) {
      steps.push({
        ...dto,
        apsDisplayId: await this.generateDisplayId(),
        status: ApprovalStepStatus.PENDING,
        groupId: dto.groupId ?? [],
        requiredAll: dto.requiredAll ?? true,
        isFinalStep: dto.isFinalStep ?? false,
      });
    }

    const createdSteps = await this.approvalStepModel.insertMany(steps);

    if (createdSteps.length === 0) {
      return createdSteps;
    }

    const requestId = String(createdSteps[0].requestId ?? '');
    const request = requestId
      ? await this.requestModel
          .findById(requestId)
          .select('creatorId code')
          .lean<{ creatorId?: unknown; code?: string }>()
          .exec()
      : null;

    const notifyTasks: Array<Promise<unknown>> = [];
    const requestCreatorId = this.toIdString(request?.creatorId);

    // Notify each approver/group member when a step is assigned.
    for (const step of createdSteps) {
      const groupRecipients = Array.isArray(step.groupId)
        ? step.groupId
            .map((memberId: unknown) => this.toIdString(memberId))
            .filter((id): id is string => Boolean(id))
        : [];

      const recipients = [
        this.toIdString(step.originalApproverId),
        ...groupRecipients,
        this.toIdString(step.actualApproverId),
      ].filter((id): id is string => Boolean(id));

      const uniqueRecipients = [...new Set(recipients)];

      for (const recipientId of uniqueRecipients) {
        notifyTasks.push(
          this.notificationsService.notifyRequestAssigned({
            recipientId,
            senderId: requestCreatorId,
            requestId: String(step.requestId),
            requestCode: request?.code,
            stepOrder: Number(step.stepOrder),
          }),
        );
      }
    }

    await Promise.all(notifyTasks);

    return createdSteps;
  }

  // Get pending approval steps for a specific approver
  async findPendingForApprover(
    approverId: string,
    query?: QueryPendingApprovalStepsDto,
  ): Promise<any> {
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
    const pagination = query ?? new QueryPendingApprovalStepsDto();

    return paginate(this.approvalStepModel, pagination, filter, {
      populate: [
        {
          path: 'requestId',
          select: '_id title code creatorId values',
          populate: [
            {
              path: 'creatorId',
              select: '_id empId name email avatar fullName positionId',
              populate: {
                path: 'positionId',
                select: '_id fullName',
              },
            },
          ],
        },
      ],
      sort: { deadlineAt: 1 },
    });

    // return this.approvalStepModel
    //   .find(filter)
    //   .sort({ deadlineAt: 1 })
    //   .skip(query?.skip || 0)
    //   .limit(query?.take || 50)
    //   .exec();
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

    const approvedRequest = await this.requestModel
      .findById(savedStep.requestId)
      .select('creatorId code')
      .lean<{ creatorId?: unknown; code?: string }>()
      .exec();

    const approvedRequestCreatorId = this.toIdString(
      approvedRequest?.creatorId,
    );
    if (approvedRequestCreatorId) {
      await this.notificationsService.notifyStepApproved({
        recipientId: approvedRequestCreatorId,
        senderId: String(actor._id),
        requestId: String(savedStep.requestId),
        requestCode: approvedRequest?.code,
        stepOrder: Number(savedStep.stepOrder),
      });
    }

    const markApproved = this.approvalStepsFlowLogService as unknown as {
      markApprovedByFlowLogId: (
        flowLogId: string,
        performerName?: string,
      ) => Promise<void>;
      markApproved: (
        requestId: string,
        performerName?: string,
      ) => Promise<void>;
    };
    // Prefer flowLogId linkage for deterministic timeline updates.
    // Fallback to requestId keeps backward compatibility for historical approval_steps.
    if (savedStep.flowLogId) {
      await markApproved.markApprovedByFlowLogId(
        String(savedStep.flowLogId),
        this.extractActorName(actor),
      );
    } else {
      await markApproved.markApproved(
        String(savedStep.requestId),
        this.extractActorName(actor),
      );
    }
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

    const rejectedRequest = await this.requestModel
      .findById(savedStep.requestId)
      .select('creatorId code')
      .lean<{ creatorId?: unknown; code?: string }>()
      .exec();

    const rejectedRequestCreatorId = this.toIdString(
      rejectedRequest?.creatorId,
    );
    if (rejectedRequestCreatorId) {
      await this.notificationsService.notifyRequestReturned({
        recipientId: rejectedRequestCreatorId,
        senderId: String(actor._id),
        requestId: String(savedStep.requestId),
        requestCode: rejectedRequest?.code,
        reason: rejectDto.reason,
      });
    }

    const markRejected = this.approvalStepsFlowLogService as unknown as {
      markRejectedByFlowLogId: (
        flowLogId: string,
        performerName?: string,
      ) => Promise<void>;
      markRejected: (
        requestId: string,
        performerName?: string,
      ) => Promise<void>;
    };
    // Prefer flowLogId linkage for deterministic timeline updates.
    // Fallback to requestId keeps backward compatibility for historical approval_steps.
    if (savedStep.flowLogId) {
      await markRejected.markRejectedByFlowLogId(
        String(savedStep.flowLogId),
        this.extractActorName(actor),
      );
    } else {
      await markRejected.markRejected(
        String(savedStep.requestId),
        this.extractActorName(actor),
      );
    }
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

    const returnedRequest = await this.requestModel
      .findById(savedStep.requestId)
      .select('creatorId code')
      .lean<{ creatorId?: unknown; code?: string }>()
      .exec();

    const returnedRequestCreatorId = this.toIdString(
      returnedRequest?.creatorId,
    );
    if (returnedRequestCreatorId) {
      await this.notificationsService.notifyRequestReturned({
        recipientId: returnedRequestCreatorId,
        senderId: String(actor._id),
        requestId: String(savedStep.requestId),
        requestCode: returnedRequest?.code,
        reason: returnDto.reason,
      });
    }

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
    return this.approvalStepModel
      .findById(id)
      .populate([
        {
          path: 'requestId',
          select: '_id title code creatorId values',
          populate: [
            {
              path: 'creatorId',
              select: '_id empId name email avatar fullName positionId',
              populate: {
                path: 'positionId',
                select: '_id fullName',
              },
            },
          ],
        },
      ])
      .exec();
  }

  async findDetailById(id: string): Promise<{
    appStep: ApprovalStep | null;
    lb: LeaveBalance | null;
  }> {
    const appStep = await this.findById(id);

    if (!appStep) {
      return { appStep: null, lb: null };
    }

    const populatedStep = appStep as ApprovalStep & {
      requestId?: {
        creatorId?: unknown;
        values?: Record<string, unknown>;
      };
    };

    const creatorId = this.toIdString(populatedStep.requestId?.creatorId);
    if (!creatorId) {
      return { appStep, lb: null };
    }

    const year = this.resolveLeaveBalanceYear(populatedStep.requestId?.values);
    const lb = await this.leaveBalanceModel
      .findOne({ userId: creatorId, year })
      .exec();

    return { appStep, lb };
  }

  // Get all approval steps by request ID
  async findByRequestId(requestId: string): Promise<ApprovalStep | null> {
    return this.approvalStepModel
      .findOne({ requestId })
      .populate([
        {
          path: 'originalApproverId',
          select: '_id name email avatar fullName positionId departmentId',
          populate: [
            {
              path: 'positionId',
              select: '_id name fullName description',
            },
            {
              path: 'departmentId',
              select: '_id name originName',
            },
          ],
        },
        {
          path: 'actualApproverId',
          select: '_id name email avatar fullName positionId departmentId',
          populate: [
            {
              path: 'positionId',
              select: '_id name fullName description',
            },
            {
              path: 'departmentId',
              select: '_id name originName',
            },
          ],
        },
        {
          path: 'requestId',
          select: '_id title code creatorId values formTemplateId',
          populate: [
            {
              path: 'creatorId',
              select: '_id name email avatar fullName positionId departmentId',
              populate: [
                {
                  path: 'positionId',
                  select: '_id name fullName description',
                },
                {
                  path: 'departmentId',
                  select: '_id name originName',
                },
              ],
            },
            {
              path: 'formTemplateId',
              // select: '_id name code values',
            },
          ],
        },
      ])
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
            currentStepOrder: 0,
          },
        },
      )
      .exec();

    const requests = await this.requestModel
      .find({ _id: { $in: requestIds } })
      .select('_id creatorId code')
      .lean<Array<{ _id?: unknown; creatorId?: unknown; code?: string }>>()
      .exec();

    await Promise.all(
      requests
        .filter((request) => Boolean(request.creatorId))
        .map((request) =>
          this.notificationsService.notifyRequestReturned({
            recipientId: String(request.creatorId),
            senderId: null,
            requestId: String(request._id),
            requestCode: request.code,
            reason:
              'System auto-returned after deadline because no valid approver was found',
          }),
        ),
    );
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
        currentStepOrder: 0,
      });
      return;
    }

    const returnedStep = steps.find(
      (step) => step.status === ApprovalStepStatus.RETURNED,
    );
    if (returnedStep) {
      await this.requestModel.findByIdAndUpdate(requestId, {
        status: RequestStatus.RETURNED,
        currentStepOrder: 0,
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
        currentStepOrder: 1,
      });

      if (request?.creatorId) {
        const latestApprovedStep = [...steps]
          .reverse()
          .find((step) => step.status === ApprovalStepStatus.APPROVED);

        await this.notificationsService.notifyRequestApproved({
          recipientId: String(request.creatorId),
          senderId: latestApprovedStep?.actualApproverId
            ? String(latestApprovedStep.actualApproverId)
            : null,
          requestId,
          requestCode: String(request.code ?? ''),
        });
      }

      return;
    }

    await this.requestModel.findByIdAndUpdate(requestId, {
      status: RequestStatus.PENDING,
      currentStepOrder: 0,
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

  private extractActorName(actor: RequestActor): string | undefined {
    if (typeof actor === 'object' && actor !== null && 'fullName' in actor) {
      const fullName = (actor as { fullName?: unknown }).fullName;
      return typeof fullName === 'string' && fullName.trim().length > 0
        ? fullName
        : undefined;
    }

    return undefined;
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

  private async generateDisplayId(): Promise<string> {
    const modulePrefix = 'APS';
    const dateSegment = this.getDateSegment(new Date());
    const counterKey = `${modulePrefix}-${dateSegment}`;

    // Atomic increment by key (module + day) prevents duplicate IDs under concurrency.
    const counter = await this.counterModel
      .findOneAndUpdate(
        { _id: counterKey },
        { $inc: { seq: 1 } },
        {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true,
        },
      )
      .lean<{ seq?: number }>()
      .exec();

    const sequence = Number(counter?.seq ?? 0);
    if (!sequence || sequence > 9999) {
      throw new BadRequestException(
        `Display ID sequence for ${counterKey} is out of supported range`,
      );
    }

    return `${modulePrefix}-${dateSegment}-${String(sequence).padStart(4, '0')}`;
  }

  private getDateSegment(date: Date): string {
    // ddmmyy
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);

    return `${day}${month}${year}`;
  }

  private toIdString(value: unknown): string | null {
    if (typeof value === 'string' || typeof value === 'number') {
      const normalized = String(value).trim();
      return normalized.length > 0 ? normalized : null;
    }

    if (typeof value === 'object' && value !== null && 'toString' in value) {
      const normalized = (value as { toString: () => string })
        .toString()
        .trim();
      return normalized && normalized !== '[object Object]' ? normalized : null;
    }

    return null;
  }
}
