import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { AuditLogsService } from './audit-logs.service';
import { CreateAuditLogDto } from './dto/create-audit-log.dto';
import { QueryAuditLogDto } from './dto/query-audit-log.dto';

@Controller('audit-logs')
export class AuditLogsController {
  constructor(private readonly auditLogsService: AuditLogsService) {}

  @Post()
  create(@Body() createAuditLogDto: CreateAuditLogDto) {
    return this.auditLogsService.create(createAuditLogDto);
  }

  @Get()
  findAll(@Query() queryAuditLogDto: QueryAuditLogDto) {
    return this.auditLogsService.findAll(queryAuditLogDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.auditLogsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.auditLogsService.remove(id);
  }
}
