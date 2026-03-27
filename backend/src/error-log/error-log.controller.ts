import { Controller, Get, Param, Delete, Query } from '@nestjs/common';
import { ErrorLogService } from './error-log.service';

import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('error-log')
export class ErrorLogController {
  constructor(private readonly errorLogService: ErrorLogService) {}

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.errorLogService.findAll(paginationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.errorLogService.remove(id);
  }
}
