import {
  Injectable,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request } from './requests.schema';
import { paginate } from 'src/common/utils/pagination.util';
import { QueryRequestsDto } from './dto/query-requests.dto';
import { RequestStatus } from 'src/enum/request-status.enum';
import { UsersService } from '../users/users.service';
import { ApprovalStepsService } from '../approval-steps/approval-steps.service';
import { LeaveBalance } from '../leave-balances/leave-balances.schema';
import { FormTemplate } from '../form-template/form-template.schema';
import { ApprovalStep } from '../approval-steps/approval-steps.schema';
import { ApprovalStepStatus } from '../enum/approval-step-status.enum';
import { Counter } from '../counters/counters.schema';
import { ApprovalStepsFlowLogService } from '../approval-steps-flow-log/approval-steps-flow-log.service';

type RequestActor = {
  _id?: string;
  roleId?: {
    name?: string;
  };
};

@Injectable()
export class RequestsService {
  // Responsibilities:
  // 1) Validate/normalize payload when requester submits a request.
  // 2) Resolve direct manager approver and create approval step.
  // 3) Enforce access scope for list/detail (admin, department, approver-assigned, self).
  // 4) Guard leave-balance rules before submit and deduct only when request is actually approved.
  constructor(
    @InjectModel(Request.name)
    private readonly requestModel: Model<Request>,
    @InjectModel(Counter.name)
    private readonly counterModel: Model<Counter>,
    @InjectModel(LeaveBalance.name)
    private readonly leaveBalanceModel: Model<LeaveBalance>,
    @InjectModel(FormTemplate.name)
    private readonly formTemplateModel: Model<FormTemplate>,
    @InjectModel(ApprovalStep.name)
    private readonly approvalStepModel: Model<ApprovalStep>,
    private readonly usersService: UsersService,
    private readonly approvalStepsService: ApprovalStepsService,
    private readonly approvalStepsFlowLogService: ApprovalStepsFlowLogService,
  ) {}

  async create(createRequestDto: CreateRequestDto, user: any) {
    const status = createRequestDto.status ?? RequestStatus.PENDING;
    const normalizedValues = this.normalizeRequestValues(
      createRequestDto.values,
    );

    const createNewRequest = new this.requestModel({
      ...createRequestDto,
      reqDisplayId: await this.generateDisplayId(),
      values: normalizedValues,
      creatorId: user?._id,
      status,
      currentStepOrder:
        status === RequestStatus.DRAFT
          ? 0
          : (createRequestDto.currentStepOrder ?? 0),
    });

    const request = await createNewRequest.save();

    if (status === RequestStatus.DRAFT) {
      return request;
    }

    await this.ensureSufficientLeaveBalance(
      String(user?._id),
      String(createRequestDto.code),
      String(createRequestDto.formTemplateId),
      normalizedValues,
    );

    const requesterAndManager = await this.resolveRequesterManagerContext(
      String(user?._id),
    );

    // Create flow-log first so each approval step can persist a stable flowLogId reference.
    const flowLog =
      await this.approvalStepsFlowLogService.createOrResetForRequest({
        requestId: String(request._id),
        requesterName: requesterAndManager.requesterName,
        managerName: requesterAndManager.managerName,
      });

    await this.approvalStepsService.createBatch([
      {
        requestId: String(request._id),
        flowLogId: String(flowLog._id),
        originalApproverId: requesterAndManager.managerId,
        stepOrder: 1,
        stepLabel: 'Dept Manager Approval',
        groupId: [],
        isFinalStep: true,
        requiredAll: true,
      },
    ]);

    return request;
  }

  async resubmitAfterReturn(id: string, user: any) {
    const request = await this.requestModel.findById(id);

    if (!request) {
      return null;
    }

    this.validateAccess(request, user);

    if (
      ![RequestStatus.RETURNED, RequestStatus.CANCELLED].includes(
        request.status,
      )
    ) {
      throw new BadRequestException(
        'Chỉ có thể gửi lại đơn đang ở trạng thái RETURNED hoặc CANCELLED',
      );
    }

    await this.approvalStepsService.deleteByRequestId(String(request._id));

    await this.ensureSufficientLeaveBalance(
      String(request.creatorId),
      String(request.code),
      String(request.formTemplateId),
      request.values,
    );

    const requesterAndManager = await this.resolveRequesterManagerContext(
      String(request.creatorId),
    );

    // Resubmission resets timeline state and rewires the new approval step to the new/updated flow-log.
    const flowLog =
      await this.approvalStepsFlowLogService.createOrResetForRequest({
        requestId: String(request._id),
        requesterName: requesterAndManager.requesterName,
        managerName: requesterAndManager.managerName,
      });

    await this.approvalStepsService.createBatch([
      {
        requestId: String(request._id),
        flowLogId: String(flowLog._id),
        originalApproverId: requesterAndManager.managerId,
        stepOrder: 1,
        stepLabel: 'Dept Manager Approval',
        groupId: [],
        isFinalStep: true,
        requiredAll: true,
      },
    ]);

    request.status = RequestStatus.PENDING;
    request.currentStepOrder = 0;
    return request.save();
  }

  findAll(queryRequestsDto: QueryRequestsDto) {
    const filter = this.buildRequestFilter(queryRequestsDto);

    return paginate(this.requestModel, queryRequestsDto, filter, {
      sort: { createdAt: -1 },
    });
  }

  async findAllAccessible(queryRequestsDto: QueryRequestsDto, user: any) {
    // Route-level guard checks permission existence; this method applies data scope.
    const filter = await this.buildAccessibleFilter(queryRequestsDto, user);

    return paginate(this.requestModel, queryRequestsDto, filter, {
      sort: { createdAt: -1 },
    });
  }

  async findOneAccessible(id: string, user: any) {
    const filter = await this.buildAccessibleFilter(undefined, user);
    const request = await this.requestModel
      .findOne({ _id: id, ...filter })
      .populate('formTemplateId')
      .exec();

    if (!request) {
      return null;
    }

    return request;
  }

  private buildRequestFilter(
    queryRequestsDto?: QueryRequestsDto,
  ): Record<string, any> {
    const filter: Record<string, any> = {};

    if (!queryRequestsDto) {
      return filter;
    }

    if (queryRequestsDto.status) {
      filter.status = queryRequestsDto.status;
    }

    if (queryRequestsDto.creatorId) {
      filter.creatorId = queryRequestsDto.creatorId;
    }

    if (queryRequestsDto.formTemplateId) {
      filter.formTemplateId = queryRequestsDto.formTemplateId;
    }

    if (queryRequestsDto.createdFrom || queryRequestsDto.createdTo) {
      filter.createdAt = {};

      if (queryRequestsDto.createdFrom) {
        filter.createdAt.$gte = new Date(queryRequestsDto.createdFrom);
      }

      if (queryRequestsDto.createdTo) {
        filter.createdAt.$lte = new Date(queryRequestsDto.createdTo);
      }
    }

    return filter;
  }

  async findOne(id: string) {
    const request = await this.requestModel
      .findById(id)
      .populate('formTemplateId');

    if (!request) {
      return null;
    }

    return request;
  }

  private async buildAccessibleFilter(
    queryRequestsDto: QueryRequestsDto | undefined,
    user: any,
  ): Promise<Record<string, any>> {
    // Access priority:
    // - ADMIN / READ_ALL_LEAVE: global data.
    // - READ_DEPARTMENT_LEAVE: creators in same department.
    // - Approver permissions: include requests where current user is assigned approver/delegate.
    // - Fallback: own requests only.
    const baseFilter = this.buildRequestFilter(queryRequestsDto);

    if (!user?._id) {
      return { ...baseFilter, creatorId: null };
    }

    const userId = String(user._id);
    const roleName = String(user?.roleId?.name ?? '').toUpperCase();
    if (roleName === 'ADMIN') {
      return baseFilter;
    }

    const userPermissions = this.extractPermissionCodes(user);
    const canReadAll = userPermissions.includes('READ_ALL_LEAVE');
    if (canReadAll) {
      return baseFilter;
    }

    const scopeFilters: Record<string, any>[] = [{ creatorId: userId }];

    const canReadDepartment = userPermissions.includes('READ_DEPARTMENT_LEAVE');
    if (canReadDepartment) {
      const departmentId = String(
        user?.departmentId?._id ?? user?.departmentId ?? '',
      );

      if (!departmentId) {
        throw new ForbiddenException(
          'Không thể xác định phòng ban để xem đơn theo phạm vi department',
        );
      }

      const userIds =
        await this.usersService.findUserIdsByDepartment(departmentId);

      if (userIds.length > 0) {
        scopeFilters.push({ creatorId: { $in: userIds } });
      }
    }

    const canAccessApprovalFlow =
      userPermissions.includes('APPROVE_LEAVE') ||
      userPermissions.includes('REJECT_LEAVE') ||
      userPermissions.includes('FORWARD_LEAVE');

    if (canAccessApprovalFlow) {
      const approverRequestIds =
        await this.findPendingRequestIdsForApprover(userId);

      if (approverRequestIds.length > 0) {
        scopeFilters.push({ _id: { $in: approverRequestIds } });
      }
    }

    if (scopeFilters.length === 0) {
      return { ...baseFilter, creatorId: null };
    }

    if (Object.keys(baseFilter).length === 0) {
      return scopeFilters.length === 1
        ? scopeFilters[0]
        : { $or: scopeFilters };
    }

    return {
      $and: [
        baseFilter,
        scopeFilters.length === 1 ? scopeFilters[0] : { $or: scopeFilters },
      ],
    };
  }

  private async findPendingRequestIdsForApprover(
    approverId: string,
  ): Promise<string[]> {
    // Keep request-list visibility aligned with approval inbox visibility.
    // If a user can act on a pending/delegated step, they should also be able to read that request.
    const steps = await this.approvalStepModel
      .find({
        $or: [
          { originalApproverId: approverId },
          { groupId: approverId },
          { actualApproverId: approverId },
        ],
        status: {
          $in: [ApprovalStepStatus.PENDING, ApprovalStepStatus.DELEGATED],
        },
      })
      .select('requestId')
      .lean<Array<{ requestId?: unknown }>>()
      .exec();

    return [
      ...new Set(steps.map((step) => String(step.requestId)).filter(Boolean)),
    ];
  }

  private extractPermissionCodes(user: any): string[] {
    const rawPermissions: unknown[] = Array.isArray(user?.roleId?.permissions)
      ? (user.roleId.permissions as unknown[])
      : [];

    return rawPermissions
      .map((permission: unknown) =>
        typeof permission === 'object' && permission !== null
          ? (permission as { code?: unknown }).code
          : permission,
      )
      .filter((code: unknown): code is string => typeof code === 'string');
  }

  async update(id: string, updateRequestDto: UpdateRequestDto, user: any) {
    const request = await this.requestModel.findById(id);

    if (!request) {
      return null;
    }
    this.validateAccess(request, user);

    return this.requestModel.findByIdAndUpdate(id, updateRequestDto, {
      new: true,
    });
  }

  async remove(id: string, user: any) {
    const request = await this.requestModel.findById(id);

    if (!request) {
      return null;
    }

    this.validateAccess(request, user);

    await this.approvalStepsService.returnByRequestId(
      String(request._id),
      'Request cancelled by requester',
    );

    request.status = RequestStatus.CANCELLED;
    request.currentStepOrder = request.currentStepOrder ?? 0;

    await this.approvalStepsFlowLogService.markCancelled(String(request._id));

    return request.save();
  }

  async hardRemove(id: string, user: any) {
    const request = await this.requestModel.findById(id);

    if (!request) {
      return null;
    }

    this.validateAccess(request, user);

    await this.approvalStepsService.deleteByRequestId(String(request._id));

    return this.requestModel.findByIdAndDelete(id);
  }

  /**
   * Kiểm tra xem user có quyền truy cập request này không
   * - Cho phép nếu user là creator của request
   * - Cho phép nếu user là ADMIN
   * - Reject nếu không
   */
  private validateAccess(request: Request, user: RequestActor): void {
    if (!user) {
      throw new ForbiddenException('Không có quyền truy cập');
    }

    // Kiểm tra user._id có trùng với creatorId
    const isCreator = request.creatorId?.toString() === String(user._id);

    // Kiểm tra user có phải ADMIN
    const isAdmin = user.roleId?.name === 'ADMIN';

    if (!isCreator && !isAdmin) {
      throw new ForbiddenException('Bạn không có quyền truy cập request này');
    }
  }

  private async resolveRequesterManagerContext(requesterId: string): Promise<{
    requesterName: string;
    managerId: string;
    managerName: string;
  }> {
    const requesterResult = await this.usersService.findOne(requesterId);
    const requesterRaw =
      requesterResult &&
      typeof requesterResult === 'object' &&
      'user' in requesterResult
        ? (requesterResult as { user?: unknown }).user
        : requesterResult;

    if (!requesterRaw || typeof requesterRaw !== 'object') {
      throw new BadRequestException('Không tìm thấy thông tin người gửi đơn');
    }

    const requester = requesterRaw as {
      fullName?: unknown;
      managerId?: unknown;
    };

    const managerRaw = requester.managerId as
      | {
          _id?: unknown;
          fullName?: unknown;
        }
      | string
      | undefined;

    const managerId =
      typeof managerRaw === 'string'
        ? managerRaw
        : this.toSafeString(managerRaw?._id);

    if (!managerId) {
      throw new BadRequestException(
        'Nhân viên chưa có quản lý trực tiếp, không thể gửi đơn',
      );
    }

    const managerName =
      typeof managerRaw === 'string'
        ? 'Direct Manager'
        : this.toSafeText(managerRaw?.fullName, 'Direct Manager');

    return {
      requesterName: this.toSafeText(requester.fullName, 'Requester'),
      managerId,
      managerName,
    };
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

  private normalizeRequestValues(
    values?: Record<string, unknown>,
  ): Record<string, unknown> {
    if (!values || typeof values !== 'object') {
      return values ?? {};
    }

    const normalized = { ...values };

    const startRaw = normalized.startDate ?? normalized.fromDate;
    const endRaw = normalized.endDate ?? normalized.toDate;

    if (!startRaw || !endRaw) {
      return normalized;
    }

    const startDate = this.parseDateInput(startRaw);
    const endDate = this.parseDateInput(endRaw);

    if (!startDate || !endDate) {
      throw new BadRequestException(
        'Ngày bắt đầu/kết thúc không hợp lệ để tính totalDays',
      );
    }

    if (endDate < startDate) {
      throw new BadRequestException(
        'Ngày bắt đầu/kết thúc không hợp lệ để tính totalDays',
      );
    }

    const existingAmount = this.extractApprovalAmount(normalized);

    if (typeof existingAmount === 'number' && Number.isFinite(existingAmount)) {
      return normalized;
    }

    const MS_PER_DAY = 24 * 60 * 60 * 1000;
    const utcStart = Date.UTC(
      startDate.getUTCFullYear(),
      startDate.getUTCMonth(),
      startDate.getUTCDate(),
    );
    const utcEnd = Date.UTC(
      endDate.getUTCFullYear(),
      endDate.getUTCMonth(),
      endDate.getUTCDate(),
    );

    // Inclusive range: from startDate through endDate.
    const totalDays = Math.floor((utcEnd - utcStart) / MS_PER_DAY) + 1;
    normalized.totalDays = totalDays;

    return normalized;
  }

  private parseDateInput(value: unknown): Date | null {
    if (value instanceof Date) {
      return Number.isNaN(value.getTime()) ? null : value;
    }

    if (typeof value === 'string' || typeof value === 'number') {
      const date = new Date(value);
      return Number.isNaN(date.getTime()) ? null : date;
    }

    return null;
  }

  private async shouldValidateLeaveBalance(
    requestTypeCode: string,
    formTemplateId?: string,
  ): Promise<boolean> {
    if (formTemplateId) {
      const template = await this.formTemplateModel
        .findById(formTemplateId)
        .select('isReductible')
        .lean<{ isReductible?: boolean }>()
        .exec();

      if (template && typeof template.isReductible === 'boolean') {
        return template.isReductible;
      }
    }

    const normalizedType = String(requestTypeCode ?? '').toUpperCase();
    return (
      normalizedType.includes('LEAVE') &&
      !normalizedType.includes('RESIGNATION')
    );
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

  private async ensureSufficientLeaveBalance(
    creatorId: string,
    requestTypeCode: string,
    formTemplateId: string,
    values?: Record<string, unknown>,
  ): Promise<void> {
    // Pre-submit balance validation only. Actual deduction happens after request is fully approved.
    if (
      !(await this.shouldValidateLeaveBalance(requestTypeCode, formTemplateId))
    ) {
      return;
    }

    const requestedDays = this.extractApprovalAmount(values);
    if (!requestedDays || requestedDays <= 0) {
      return;
    }

    const year = this.resolveLeaveBalanceYear(values);

    const balance = await this.leaveBalanceModel
      .findOne({ userId: creatorId, year })
      .select('remainingDays')
      .lean()
      .exec();

    if (!balance) {
      throw new BadRequestException(
        `Không tìm thấy leave balance cho năm ${year}`,
      );
    }

    if (Number(balance.remainingDays ?? 0) < requestedDays) {
      throw new BadRequestException(
        `Số dư nghỉ phép không đủ. Còn lại ${balance.remainingDays} ngày, yêu cầu ${requestedDays} ngày`,
      );
    }
  }

  private async deductLeaveBalanceIfNeeded(request: Request): Promise<void> {
    // Post-approval deduction to avoid consuming leave for requests that are still pending/returned.
    const shouldDeduct = await this.shouldValidateLeaveBalance(
      String(request.code),
      String(request.formTemplateId),
    );

    if (!shouldDeduct) {
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

  private async generateDisplayId(): Promise<string> {
    const modulePrefix = 'REQ';
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

  private toSafeString(value: unknown): string {
    if (typeof value === 'string' || typeof value === 'number') {
      return String(value);
    }

    if (typeof value === 'object' && value !== null && 'toString' in value) {
      const normalized = (value as { toString: () => string }).toString();
      return normalized === '[object Object]' ? '' : normalized;
    }

    return '';
  }

  private toSafeText(value: unknown, fallback: string): string {
    return typeof value === 'string' && value.trim().length > 0
      ? value
      : fallback;
  }
}
