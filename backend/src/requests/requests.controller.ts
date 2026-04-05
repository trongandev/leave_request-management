import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { QueryRequestsDto } from './dto/query-requests.dto';
import { RequirePermissions } from 'src/auth/decorators/permissions.decorator';
import { Permission } from 'src/enum/permission.enum';

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post()
  @RequirePermissions(Permission.CREATE_LEAVE)
  create(@Body() createRequestDto: CreateRequestDto, @CurrentUser() user: any) {
    return this.requestsService.create(createRequestDto, user);
  }

  // User xem danh sách request của chính mình theo creatorId.
  @Get('self')
  @RequirePermissions(Permission.READ_OWN_LEAVE)
  findSelf(
    @Query() queryRequestsDto: QueryRequestsDto,
    @CurrentUser() user: any,
  ) {
    const selfQuery: QueryRequestsDto = {
      ...queryRequestsDto,
      creatorId: String(user?._id),
    };

    return this.requestsService.findAll(selfQuery);
  }

  // Scope-aware listing:
  // - ADMIN: all requests
  // - Department-level permission: requests created by users in same department
  // - Approver/delegate: requests currently assigned to them in approval steps
  // - Default: own requests
  @Get()
  @RequirePermissions(Permission.READ_OWN_LEAVE)
  findAll(
    @Query() queryRequestsDto: QueryRequestsDto,
    @CurrentUser() user: any,
  ) {
    return this.requestsService.findAllAccessible(queryRequestsDto, user);
  }

  // Detail endpoint follows the same scope rules as list endpoint.
  @Get(':id')
  @RequirePermissions(Permission.READ_OWN_LEAVE)
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.requestsService.findOneAccessible(id, user);
  }

  @Patch(':id/resubmit-after-return')
  @RequirePermissions(Permission.UPDATE_OWN_LEAVE)
  resubmitAfterReturn(@Param('id') id: string, @CurrentUser() user: any) {
    return this.requestsService.resubmitAfterReturn(id, user);
  }

  @Patch(':id')
  @RequirePermissions(Permission.UPDATE_OWN_LEAVE)
  update(
    @Param('id') id: string,
    @Body() updateRequestDto: UpdateRequestDto,
    @CurrentUser() user: any,
  ) {
    console.log(id, updateRequestDto);
    return this.requestsService.update(id, updateRequestDto, user);
  }

  @Delete(':id/permanent')
  @RequirePermissions(Permission.DELETE_OWN_LEAVE)
  hardRemove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.requestsService.hardRemove(id, user);
  }

  @Delete(':id')
  @RequirePermissions(Permission.DELETE_OWN_LEAVE)
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.requestsService.remove(id, user);
  }
}
