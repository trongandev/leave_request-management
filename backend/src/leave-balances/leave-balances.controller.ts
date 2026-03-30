import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { LeaveBalancesService } from './leave-balances.service';
import { CreateLeaveBalanceDto } from './dto/create-leave-balance.dto';
import { UpdateLeaveBalanceDto } from './dto/update-leave-balance.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { AuthGuard } from '@nestjs/passport';
import { RequirePermissions } from '../auth/decorators/permissions.decorator';
import { Permission } from '../enum/permission.enum';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('leave-balances')
@ApiBearerAuth()
export class LeaveBalancesController {
  constructor(private readonly leaveBalancesService: LeaveBalancesService) {}

  // Admin/HR operation to initialize or upsert a user-year leave balance.
  @Post()
  @UseGuards(AuthGuard('jwt'))
  @RequirePermissions(Permission.MANAGE_USERS)
  create(@Body() createLeaveBalanceDto: CreateLeaveBalanceDto) {
    return this.leaveBalancesService.create(createLeaveBalanceDto);
  }

  // Protected paginated listing for approval/admin use-cases.
  @Get()
  @UseGuards(AuthGuard('jwt'))
  @RequirePermissions(Permission.READ_ALL_LEAVE)
  findAll(@Query() paginationDto: PaginationDto) {
    return this.leaveBalancesService.findAll(paginationDto);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @RequirePermissions(Permission.READ_ALL_LEAVE)
  findOne(@Param('id') id: string) {
    return this.leaveBalancesService.findOne(id);
  }

  // Protected manual adjustment endpoint for correction workflows.
  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @RequirePermissions(Permission.MANAGE_USERS) // Sửa quyền nếu cần để cho phép HR và Admin chỉnh sửa leave balance khi cần thiết.
  update(
    @Param('id') id: string,
    @Body() updateLeaveBalanceDto: UpdateLeaveBalanceDto,
  ) {
    return this.leaveBalancesService.update(id, updateLeaveBalanceDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @RequirePermissions(Permission.MANAGE_USERS)
  remove(@Param('id') id: string) {
    return this.leaveBalancesService.remove(id);
  }
}
