import { Injectable } from '@nestjs/common';

import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ErrorLog } from './error-log.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ErrorLogService {
  constructor(
    @InjectModel(ErrorLog.name) private errorLogModel: Model<ErrorLog>,
  ) {}
  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.errorLogModel.find().skip(skip).limit(limit).exec(),
      this.errorLogModel.countDocuments(),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        last_page: Math.ceil(total / limit),
      },
    };
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
