import { Controller, Get, Param, Query } from '@nestjs/common';
import { AuditLogsService } from './audit-logs.service';
import { QueryAuditLogDto } from './dto/query-audit-log.dto';
import { RequirePermissions } from '../auth/decorators/permissions.decorator';
import { Permission } from '../enum/permission.enum';

@Controller('audit-logs')
export class AuditLogsController {
  constructor(private readonly auditLogsService: AuditLogsService) {}

  @Get()
  @RequirePermissions(Permission.MANAGE_USERS)
  findAll(@Query() queryAuditLogDto: QueryAuditLogDto) {
    return this.auditLogsService.findAll(queryAuditLogDto);
  }

  @Get(':id')
  @RequirePermissions(Permission.MANAGE_USERS)
  findOne(@Param('id') id: string) {
    return this.auditLogsService.findOne(id);
  }
}
