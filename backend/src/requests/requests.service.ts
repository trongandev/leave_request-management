import {
  Injectable,
  ForbiddenException,
  NotFoundException,
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
import { ApprovalOrchestratorService } from '../approval-steps/policies/approval-orchestrator.service';
import { ApprovalStepsService } from '../approval-steps/approval-steps.service';
import { UserProfile } from '../approval-steps/policies/types';
import { LeaveBalance } from '../leave-balances/leave-balances.schema';

type RequestActor = {
  _id?: string;
  roleId?: {
    name?: string;
  };
};

@Injectable()
export class RequestsService {
  constructor(
    @InjectModel(Request.name)
    private readonly requestModel: Model<Request>,
    @InjectModel(LeaveBalance.name)
    private readonly leaveBalanceModel: Model<LeaveBalance>,
    private readonly usersService: UsersService,
    private readonly approvalOrchestratorService: ApprovalOrchestratorService,
    private readonly approvalStepsService: ApprovalStepsService,
  ) {}

  async create(createRequestDto: CreateRequestDto, user: any) {
    const status = createRequestDto.status ?? RequestStatus.PENDING;
    const createNewRequest = new this.requestModel({
      ...createRequestDto,
      creatorId: user?._id,
      status,
      currentStepOrder:
        status === RequestStatus.DRAFT
          ? 0
          : (createRequestDto.currentStepOrder ?? 1),
    });

    const request = await createNewRequest.save();

    if (status === RequestStatus.DRAFT) {
      return request;
    }

    await this.ensureSufficientLeaveBalance(
      String(user?._id),
      String(createRequestDto.code),
      createRequestDto.values,
    );

    const approvalAmount = this.extractApprovalAmount(createRequestDto.values);

    const resolution = await this.planApprovalResolution(
      String(user?._id),
      String(createRequestDto.code),
      approvalAmount,
    );

    if (resolution.autoApprove) {
      request.status = RequestStatus.APPROVED;
      await request.save();
      return request;
    }

    const persistableSteps =
      this.approvalOrchestratorService.transformToPersistableSteps(
        resolution,
        String(request._id),
      );

    if (persistableSteps.length > 0) {
      await this.approvalStepsService.createBatch(persistableSteps);
    }

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
      request.values,
    );

    const resolution = await this.planApprovalResolution(
      String(request.creatorId),
      String(request.code),
      this.extractApprovalAmount(request.values),
    );

    if (resolution.autoApprove) {
      request.status = RequestStatus.APPROVED;
      request.currentStepOrder = 1;
      return request.save();
    }

    const persistableSteps =
      this.approvalOrchestratorService.transformToPersistableSteps(
        resolution,
        String(request._id),
      );

    if (persistableSteps.length > 0) {
      await this.approvalStepsService.createBatch(persistableSteps);
      request.currentStepOrder = Math.min(
        ...persistableSteps.map((step) => step.stepOrder),
      );
    } else {
      request.currentStepOrder = 1;
    }

    request.status = RequestStatus.PENDING;
    return request.save();
  }

  findAll(queryRequestsDto: QueryRequestsDto) {
    const filter: Record<string, any> = {};

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

    return paginate(this.requestModel, queryRequestsDto, filter, {
      sort: { createdAt: -1 },
    });
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
    request.currentStepOrder = request.currentStepOrder ?? 1;

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

  private toUserProfile(userDoc: any): UserProfile | null {
    if (!userDoc?._id || !userDoc?.roleId || !userDoc?.positionId) {
      return null;
    }

    const roleId =
      typeof userDoc.roleId === 'string'
        ? { _id: userDoc.roleId, name: '' }
        : userDoc.roleId;

    const positionId =
      typeof userDoc.positionId === 'string' ? null : userDoc.positionId;

    if (!positionId?.level) {
      return null;
    }

    return {
      _id: String(userDoc._id),
      empId: String(userDoc.empId ?? ''),
      fullName: String(userDoc.fullName ?? ''),
      positionId: {
        _id: String(positionId._id),
        level: Number(positionId.level),
        name: String(positionId.name ?? ''),
        departmentId: String(
          positionId.departmentId ?? userDoc.departmentId ?? '',
        ),
      },
      departmentId: String(
        userDoc.departmentId?._id ?? userDoc.departmentId ?? '',
      ),
      managerId: userDoc.managerId
        ? String(userDoc.managerId._id ?? userDoc.managerId)
        : undefined,
      roleId: {
        _id: String(roleId._id ?? ''),
        name: String(roleId.name ?? '').toUpperCase(),
      },
    };
  }

  private async planApprovalResolution(
    requesterId: string,
    requestTypeCode: string,
    amount?: number,
  ) {
    const requesterDoc = await this.usersService.findOne(requesterId);
    const requesterSource =
      requesterDoc && typeof requesterDoc === 'object' && 'user' in requesterDoc
        ? (requesterDoc as { user?: unknown }).user
        : requesterDoc;

    if (!requesterSource) {
      throw new NotFoundException('Requester not found');
    }

    const requester = this.toUserProfile(requesterSource);
    if (!requester) {
      throw new BadRequestException(
        'Requester profile is incomplete: cần roleId, departmentId và positionId.level',
      );
    }

    const allUsersResult = await this.usersService.findAll({
      page: 1,
      limit: 1000,
    } as any);

    const rawUsers =
      allUsersResult && typeof allUsersResult === 'object'
        ? (allUsersResult as { data?: unknown[] }).data
        : undefined;

    const allUsers = Array.isArray(rawUsers)
      ? rawUsers
          .map((item) => this.toUserProfile(item))
          .filter((item): item is UserProfile => Boolean(item))
      : [];

    return this.approvalOrchestratorService.planApprovalSteps(
      requester,
      allUsers,
      {
        formType: requestTypeCode,
        amount,
      },
    );
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

  private shouldValidateLeaveBalance(requestTypeCode: string): boolean {
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
    values?: Record<string, unknown>,
  ): Promise<void> {
    if (!this.shouldValidateLeaveBalance(requestTypeCode)) {
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
}
