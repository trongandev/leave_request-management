import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLeaveBalanceDto } from './dto/create-leave-balance.dto';
import { UpdateLeaveBalanceDto } from './dto/update-leave-balance.dto';
import { AdjustLeaveBalanceDto } from './dto/adjust-leave-balance.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LeaveBalance } from './leave-balances.schema';
import { LeaveBalanceLog } from './leave-balance-logs.schema';
import { User } from '../users/users.schema';
import { SystemSettingService } from '../system-setting/system-setting.service';
import { PaginationDto } from '../common/dto/pagination.dto';
import { paginate } from '../common/utils/pagination.util';
import { Counter } from '../counters/counters.schema';
import path from 'path';

@Injectable()
export class LeaveBalancesService {
  constructor(
    @InjectModel(LeaveBalance.name)
    private readonly leaveBalanceModel: Model<LeaveBalance>,
    @InjectModel(LeaveBalanceLog.name)
    private readonly leaveBalanceLogModel: Model<LeaveBalanceLog>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(Counter.name)
    private readonly counterModel: Model<Counter>,
    private readonly systemSettingService: SystemSettingService,
  ) {}

  private async getNextLeaveBalanceLogId() {
    const counter = await this.counterModel
      .findOneAndUpdate(
        { _id: 'leave_balance_log' },
        { $inc: { seq: 1 } },
        { upsert: true, new: true },
      )
      .select('seq')
      .lean<{ seq: number }>()
      .exec();

    return Number(counter?.seq ?? 1);
  }

  private async createAdjustmentLog(
    userId: string,
    changeAmount: number,
    reason: string,
    requestId?: string,
  ) {
    const nextId = await this.getNextLeaveBalanceLogId();

    return this.leaveBalanceLogModel.create({
      _id: nextId,
      userId,
      requestId: requestId?.trim() ?? '',
      changeAmount,
      reason: reason.trim(),
    });
  }

  private getProratedBaseDays(
    basePerYear: number,
    joinedAt: Date,
    targetYear: number,
  ) {
    // Core rule: prorate base leave for first working year by join month.
    const joinMonth = joinedAt.getMonth() + 1;
    const joinYear = joinedAt.getFullYear();

    // Nếu là năm vào làm thì áp dụng công thức prorate theo tháng.
    if (targetYear === joinYear) {
      const prorated = (basePerYear / 12) * (12 - joinMonth + 1);
      return Number(prorated.toFixed(2));
    }

    return Number(basePerYear.toFixed(2));
  }

  private getSeniorityDays(joinedAt: Date, targetYear: number) {
    // Core rule: seniority bonus is 1 day per 5 completed years.
    const yearsOfService = Math.max(0, targetYear - joinedAt.getFullYear());
    return Math.floor(yearsOfService / 5);
  }

  private toNonNegative(value: number) {
    return Math.max(0, Number(value.toFixed(2)));
  }

  private async buildBalancePayload(
    userId: string,
    year: number,
    adjustedDaysInput = 0,
    usedDaysInput = 0,
  ) {
    // Centralized calculator to keep create/update/recalculate formulas consistent.
    const user = await this.userModel
      .findById(userId)
      .select('createdAt')
      .lean<{ createdAt?: Date }>()
      .exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const leaveBasePerYear =
      await this.systemSettingService.getLeaveBasePerYear();
    const joinedAt = user.createdAt ?? new Date();

    const baseDays = this.getProratedBaseDays(leaveBasePerYear, joinedAt, year);
    const seniorityDays = this.getSeniorityDays(joinedAt, year);
    const adjustedDays = Number(adjustedDaysInput);
    const usedDays = this.toNonNegative(Number(usedDaysInput));

    const totalDays = this.toNonNegative(
      baseDays + seniorityDays + adjustedDays,
    );
    const remainingDays = this.toNonNegative(totalDays - usedDays);

    return {
      userId,
      year,
      baseDays,
      seniorityDays,
      adjustedDays,
      totalDays,
      usedDays,
      remainingDays,
    };
  }

  async create(createLeaveBalanceDto: CreateLeaveBalanceDto) {
    // Upsert 1 record per user-year to enforce leave balance uniqueness.
    const payload = await this.buildBalancePayload(
      createLeaveBalanceDto.userId,
      createLeaveBalanceDto.year,
      Number(createLeaveBalanceDto.adjustedDays ?? 0),
      Number(createLeaveBalanceDto.usedDays ?? 0),
    );

    return this.leaveBalanceModel
      .findOneAndUpdate(
        {
          userId: createLeaveBalanceDto.userId,
          year: createLeaveBalanceDto.year,
        },
        payload,
        { upsert: true, new: true },
      )
      .populate('userId', 'empId fullName email')
      .exec();
  }

  findAll(paginationDto: PaginationDto) {
    // Reuse global pagination helper for scalable list queries.
    return paginate(
      this.leaveBalanceModel,
      paginationDto,
      {},
      {
        select: '_id userId usedDays totalDays remainingDays',
        populate: {
          path: 'userId',
          select: 'empId fullName email departmentId',
          populate: {
            path: 'departmentId',
            select: 'name originName',
          },
        },
        sort: { createdAt: -1 },
      },
    );
  }

  findByUserId(userId: string, paginationDto: PaginationDto) {
    return paginate(
      this.leaveBalanceModel,
      paginationDto,
      { userId },
      {
        populate: {
          path: 'userId',
          select: 'empId fullName email departmentId positionId',
        },
        sort: { year: -1, createdAt: -1 },
      },
    );
  }

  findOne(id: string) {
    return this.leaveBalanceModel
      .findById(id)
      .populate('userId', 'empId fullName email')
      .exec();
  }

  async findLogsByLeaveBalanceId(id: string, paginationDto: PaginationDto) {
    const leaveBalance = await this.leaveBalanceModel
      .findById(id)
      .select('userId')
      .lean<{ userId?: { toString: () => string } }>()
      .exec();

    if (!leaveBalance?.userId) {
      throw new NotFoundException('Leave balance not found');
    }

    return paginate(
      this.leaveBalanceLogModel,
      paginationDto,
      { userId: leaveBalance.userId.toString() },
      { sort: { createdAt: -1 } },
    );
  }

  async update(id: string, updateLeaveBalanceDto: UpdateLeaveBalanceDto) {
    // Recompute derived fields after manual adjustment or used-day changes.
    const current = await this.leaveBalanceModel.findById(id).exec();
    if (!current) {
      throw new NotFoundException('Leave balance not found');
    }

    const adjustedDays = Number(
      updateLeaveBalanceDto.adjustedDays ?? current.adjustedDays,
    );
    const usedDays = this.toNonNegative(
      Number(updateLeaveBalanceDto.usedDays ?? current.usedDays),
    );
    const totalDays = this.toNonNegative(
      Number(current.baseDays) + Number(current.seniorityDays) + adjustedDays,
    );
    const remainingDays = this.toNonNegative(totalDays - usedDays);

    return this.leaveBalanceModel
      .findByIdAndUpdate(
        id,
        {
          adjustedDays,
          usedDays,
          totalDays,
          remainingDays,
        },
        { new: true },
      )
      .populate('userId', 'empId fullName email')
      .exec();
  }

  async adjustWithLog(id: string, dto: AdjustLeaveBalanceDto) {
    const leaveBalance = await this.leaveBalanceModel.findById(id).exec();
    if (!leaveBalance) {
      throw new NotFoundException('Leave balance not found');
    }

    const changeAmount = Number(dto.changeAmount);
    if (changeAmount === 0) {
      throw new BadRequestException('changeAmount must not be 0');
    }

    const adjustedDays = Number(leaveBalance.adjustedDays) + changeAmount;
    const usedDays = this.toNonNegative(Number(leaveBalance.usedDays));
    const totalDays = this.toNonNegative(
      Number(leaveBalance.baseDays) +
        Number(leaveBalance.seniorityDays) +
        adjustedDays,
    );
    const remainingDays = this.toNonNegative(totalDays - usedDays);

    const updatedLeaveBalance = await this.leaveBalanceModel
      .findByIdAndUpdate(
        id,
        {
          adjustedDays,
          totalDays,
          remainingDays,
        },
        { new: true },
      )
      .populate('userId', 'empId fullName email')
      .exec();

    const log = await this.createAdjustmentLog(
      String(leaveBalance.userId),
      changeAmount,
      dto.reason,
      dto.requestId,
    );

    return {
      leaveBalance: updatedLeaveBalance,
      log,
    };
  }

  async recalculateForYear(year: number) {
    // Yearly batch recalculation keeps all users aligned with latest policy settings.
    const users = await this.userModel.find().select('_id').lean().exec();

    await Promise.all(
      users.map(async (user) => {
        const userId = String((user as { _id: unknown })._id);
        const existing = await this.leaveBalanceModel
          .findOne({ userId, year })
          .select('adjustedDays usedDays')
          .lean<{ adjustedDays?: number; usedDays?: number }>()
          .exec();

        const payload = await this.buildBalancePayload(
          userId,
          year,
          Number(existing?.adjustedDays ?? 0),
          Number(existing?.usedDays ?? 0),
        );

        await this.leaveBalanceModel.findOneAndUpdate(
          { userId, year },
          payload,
          { upsert: true, new: true },
        );
      }),
    );

    return {
      message: 'Recalculate leave balances completed',
      year,
      totalUsers: users.length,
    };
  }

  remove(id: string) {
    return this.leaveBalanceModel.findByIdAndDelete(id).exec();
  }
}
