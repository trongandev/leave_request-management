import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DelegationsService } from './delegations.service';
import { DelegationsController } from './delegations.controller';
import { Delegation, DelegationSchema } from './delegations.schema';
import { User, UserSchema } from '../users/users.schema';
import { NotificationsModule } from '../notifications/notifications.module';
import { Counter, CounterSchema } from '../counters/counters.schema';

@Module({
  imports: [
    NotificationsModule,
    MongooseModule.forFeature([
      { name: Delegation.name, schema: DelegationSchema },
      { name: User.name, schema: UserSchema },
      { name: Counter.name, schema: CounterSchema },
    ]),
  ],
  controllers: [DelegationsController],
  providers: [DelegationsService],
  exports: [DelegationsService],
})
export class DelegationsModule {}
