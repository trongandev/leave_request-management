import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { paginate } from '../common/utils/pagination.util';
import { AuditLog } from './audit-logs.schema';
import { CreateAuditLogDto } from './dto/create-audit-log.dto';
import { QueryAuditLogDto } from './dto/query-audit-log.dto';

@Injectable()
export class AuditLogsService {
  constructor(
    @InjectModel(AuditLog.name)
    private readonly auditLogModel: Model<AuditLog>,
  ) {}

  create(createAuditLogDto: CreateAuditLogDto) {
    return this.auditLogModel.create(createAuditLogDto);
  }

  findAll(queryAuditLogDto: QueryAuditLogDto) {
    const filter: Record<string, unknown> = {};

    if (queryAuditLogDto.userId) {
      filter.userId = queryAuditLogDto.userId;
    }

    if (queryAuditLogDto.action) {
      filter.action = queryAuditLogDto.action;
    }

    if (queryAuditLogDto.module) {
      filter.module = queryAuditLogDto.module;
    }

    if (queryAuditLogDto.resourceId) {
      filter.resourceId = queryAuditLogDto.resourceId;
    }

    if (queryAuditLogDto.fromDate || queryAuditLogDto.toDate) {
      filter.createdAt = {};

      if (queryAuditLogDto.fromDate) {
        (filter.createdAt as Record<string, unknown>).$gte = new Date(
          queryAuditLogDto.fromDate,
        );
      }

      if (queryAuditLogDto.toDate) {
        (filter.createdAt as Record<string, unknown>).$lte = new Date(
          queryAuditLogDto.toDate,
        );
      }
    }

    return paginate(this.auditLogModel, queryAuditLogDto, filter, {
      sort: { createdAt: -1 },
    });
  }

  async findOne(id: string) {
    const auditLog = await this.auditLogModel.findById(id).exec();

    if (!auditLog) {
      throw new NotFoundException(`Audit log ${id} not found`);
    }

    return auditLog;
  }

  async remove(id: string) {
    const deleted = await this.auditLogModel.findByIdAndDelete(id).exec();

    if (!deleted) {
      throw new NotFoundException(`Audit log ${id} not found`);
    }

    return deleted;
  }
}
