import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './positions.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LeaveBalanceSchema } from 'src/leave-balances/leave-balances.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'LeaveBalance', schema: LeaveBalanceSchema },
    ]),
  ],
  providers: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}
