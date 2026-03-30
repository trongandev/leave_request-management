import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RequestTypeService } from './request-type.service';
import { CreateRequestTypeDto } from './dto/create-request-type.dto';
import { UpdateRequestTypeDto } from './dto/update-request-type.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RequirePermissions } from '../auth/decorators/permissions.decorator';
import { Permission } from '../enum/permission.enum';

@Controller('request-type')
@ApiBearerAuth()
export class RequestTypeController {
  constructor(private readonly requestTypeService: RequestTypeService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @RequirePermissions(Permission.MANAGE_LEAVE_TYPES)
  create(@Body() createRequestTypeDto: CreateRequestTypeDto) {
    return this.requestTypeService.create(createRequestTypeDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(@Query() paginationDto: PaginationDto) {
    return this.requestTypeService.findAll(paginationDto);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.requestTypeService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @RequirePermissions(Permission.MANAGE_LEAVE_TYPES)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRequestTypeDto: UpdateRequestTypeDto,
  ) {
    return this.requestTypeService.update(id, updateRequestTypeDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @RequirePermissions(Permission.MANAGE_LEAVE_TYPES)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.requestTypeService.remove(id);
  }
}
