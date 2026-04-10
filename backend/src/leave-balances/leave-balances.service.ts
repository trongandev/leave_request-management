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
import { calculateLeaveEntitlement } from '../common/utils/leave-balance-calculator.util';
import { Counter } from '../counters/counters.schema';
import { NotificationsService } from '../notifications/notifications.service';

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
    private readonly notificationsService: NotificationsService,
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

    const entitlement = calculateLeaveEntitlement({
      basePerYear: leaveBasePerYear,
      joinedAt,
      targetYear: year,
    });

    const baseDays = entitlement.baseDays;
    const effectiveBaseDays = entitlement.effectiveBaseDays;
    const seniorityDays = entitlement.seniorityDays;
    const adjustedDays = Number(adjustedDaysInput);
    const usedDays = this.toNonNegative(Number(usedDaysInput));

    const totalDays = this.toNonNegative(
      effectiveBaseDays + seniorityDays + adjustedDays,
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

    const saved = await this.leaveBalanceModel
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

    if (saved) {
      // Notify user when yearly leave balance data gets initialized/updated.
      await this.notificationsService.notifyLeaveBalanceUpdated({
        recipientId: createLeaveBalanceDto.userId,
        leaveBalanceId: String(saved._id),
        year: Number(saved.year),
      });
    }

    return saved;
  }

  findAll(paginationDto: PaginationDto, filters: any = {}) {
    // Reuse global pagination helper for scalable list queries.
    return paginate(this.leaveBalanceModel, paginationDto, filters, {
      populate: [
        {
          path: 'userId',
          select: 'empId fullName email departmentId positionId',
          populate: [
            {
              path: 'departmentId',
              select: 'name originName',
            },
            {
              path: 'positionId',
              select: 'name fullName',
            },
          ],
        },
      ],
    });
  }

  findByUserId(userId: string) {
    return this.leaveBalanceModel
      .findOne({ userId })
      .populate([
        {
          path: 'userId',
          select: 'empId fullName email departmentId positionId',
          populate: [
            {
              path: 'departmentId positionId',
              select: 'name',
            },
          ],
        },
      ])
      .exec();
  }

  findOne(id: string) {
    return this.leaveBalanceModel
      .findById(id)
      .populate([
        {
          path: 'userId',
          select: 'empId fullName email departmentId positionId',
          populate: [
            {
              path: 'departmentId positionId',
              select: 'name',
            },
          ],
        },
      ])
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

    const updated = await this.leaveBalanceModel
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

    if (updated) {
      await this.notificationsService.notifyLeaveBalanceUpdated({
        recipientId: String(current.userId),
        leaveBalanceId: String(updated._id),
        year: Number(updated.year),
      });
    }

    return updated;
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

    if (updatedLeaveBalance) {
      await this.notificationsService.notifyLeaveBalanceUpdated({
        recipientId: String(leaveBalance.userId),
        leaveBalanceId: String(updatedLeaveBalance._id),
        year: Number(updatedLeaveBalance.year),
      });
    }

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
