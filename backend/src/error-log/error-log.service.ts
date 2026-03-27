import { Injectable } from '@nestjs/common';

import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ErrorLog } from './error-log.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { paginate } from 'src/common/utils/pagination.util';

@Injectable()
export class ErrorLogService {
  constructor(
    @InjectModel(ErrorLog.name) private errorLogModel: Model<ErrorLog>,
  ) {}
  async findAll(paginationDto: PaginationDto) {
    return paginate(this.errorLogModel, paginationDto);
  }

  async createErrorLog(payload: {
    path: string;
    method: string;
    statusCode: number;
    message: unknown;
    stack?: string;
  }) {
    await this.errorLogModel.create(payload);
  }

  remove(id: string) {
    return this.errorLogModel.findByIdAndDelete(id).exec();
  }
}
