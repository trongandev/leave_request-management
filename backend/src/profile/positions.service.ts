import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { LeaveBalance } from 'src/leave-balances/leave-balances.schema';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel('LeaveBalance')
    private readonly leaveBalanceModel: Model<LeaveBalance>,
  ) {}

  async getProfile(user: any) {
    const findLB = await this.leaveBalanceModel
      .findOne({ userId: String(user._id) })
      .select('-_id remainingDays totalDays')
      .exec();
    return { user, lb: findLB };
  }
}
