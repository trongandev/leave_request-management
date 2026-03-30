import { Module } from '@nestjs/common';
import { RequestTypeService } from './request-type.service';
import { RequestTypeController } from './request-type.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestType, RequestTypeSchema } from './request-type.schema';
import { Counter, CounterSchema } from '../counters/counters.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RequestType.name, schema: RequestTypeSchema },
      { name: Counter.name, schema: CounterSchema },
    ]),
  ],
  controllers: [RequestTypeController],
  providers: [RequestTypeService],
  exports: [RequestTypeService],
})
export class RequestTypeModule {}
