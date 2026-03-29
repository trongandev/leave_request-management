import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { LeaveBalancesService } from './leave-balances.service';

@Injectable()
export class LeaveBalancesCronService {
  private readonly logger = new Logger(LeaveBalancesCronService.name);

  constructor(private readonly leaveBalancesService: LeaveBalancesService) {}

  // Scheduled yearly job at Vietnam midnight on Jan 1 to refresh all balances.
  @Cron('0 0 1 1 *', { timeZone: 'Asia/Ho_Chi_Minh' })
  async handleYearlyRecalculation() {
    const year = new Date().getFullYear();

    try {
      const result = await this.leaveBalancesService.recalculateForYear(year);
      this.logger.log(
        `Yearly leave balance recalculation finished for ${year}. Total users: ${result.totalUsers}`,
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(
        `Yearly leave balance recalculation failed for ${year}: ${message}`,
      );
    }
  }
}
