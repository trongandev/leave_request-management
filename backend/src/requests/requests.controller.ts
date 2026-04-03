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

  // Chỉ admin mới được xem tất cả request.
  @Get()
  @RequirePermissions(Permission.READ_ALL_LEAVE)
  findAll(@Query() queryRequestsDto: QueryRequestsDto) {
    return this.requestsService.findAll(queryRequestsDto);
  }

  // Chỉ admin được xem chi tiết request theo request id.
  @Get(':id')
  @RequirePermissions(Permission.READ_ALL_LEAVE)
  findOne(@Param('id') id: string) {
    return this.requestsService.findOne(id);
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
