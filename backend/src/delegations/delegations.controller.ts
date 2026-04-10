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
import { DelegationsService } from './delegations.service';
import { CreateDelegationDto } from './dto/create-delegation.dto';
import { UpdateDelegationDto } from './dto/update-delegation.dto';
import { QueryDelegationDto } from './dto/query-delegation.dto';
import { RequirePermissions } from '../auth/decorators/permissions.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Permission } from '../enum/permission.enum';

@Controller('delegations')
export class DelegationsController {
  constructor(private readonly delegationsService: DelegationsService) {}

  // Create a delegation window so delegatee can act on approver's steps.
  @Post()
  @RequirePermissions(Permission.CREATE_DELEGATION)
  create(
    @Body() createDelegationDto: CreateDelegationDto,
    @CurrentUser() user: any,
  ) {
    return this.delegationsService.create(createDelegationDto, user);
  }

  // Query delegation records by owner/delegatee/date/type scope.
  @Get()
  @RequirePermissions(Permission.READ_OWN_DELEGATION)
  findAll(
    @Query() queryDelegationDto: QueryDelegationDto,
    @CurrentUser() user: any,
  ) {
    return this.delegationsService.findAll(queryDelegationDto, user);
  }

  // Admin endpoint to query all delegation records system-wide.
  @Get('all')
  @RequirePermissions(Permission.READ_ALL_DELEGATION)
  findAllAdmin(
    @Query() queryDelegationDto: QueryDelegationDto,
    @CurrentUser() user: any,
  ) {
    return this.delegationsService.findAll(queryDelegationDto, user);
  }

  @Get(':id')
  @RequirePermissions(Permission.READ_OWN_DELEGATION)
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.delegationsService.findOne(id, user);
  }

  @Patch(':id')
  @RequirePermissions(Permission.UPDATE_OWN_DELEGATION)
  update(
    @Param('id') id: string,
    @Body() updateDelegationDto: UpdateDelegationDto,
    @CurrentUser() user: any,
  ) {
    return this.delegationsService.update(id, updateDelegationDto, user);
  }

  @Delete(':id')
  @RequirePermissions(Permission.DELETE_OWN_DELEGATION)
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.delegationsService.remove(id, user);
  }
}
