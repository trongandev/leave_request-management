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
import { Permission } from '../enum/permission.enum';

@Controller('delegations')
export class DelegationsController {
  constructor(private readonly delegationsService: DelegationsService) {}

  // Create a delegation window so delegatee can act on approver's steps.
  @Post()
  @RequirePermissions(Permission.FORWARD_LEAVE)
  create(@Body() createDelegationDto: CreateDelegationDto) {
    return this.delegationsService.create(createDelegationDto);
  }

  // Query delegation records by owner/delegatee/date/type scope.
  @Get()
  @RequirePermissions(Permission.READ_ALL_LEAVE)
  findAll(@Query() queryDelegationDto: QueryDelegationDto) {
    return this.delegationsService.findAll(queryDelegationDto);
  }

  @Get(':id')
  @RequirePermissions(Permission.READ_ALL_LEAVE)
  findOne(@Param('id') id: string) {
    return this.delegationsService.findOne(id);
  }

  @Patch(':id')
  @RequirePermissions(Permission.FORWARD_LEAVE)
  update(
    @Param('id') id: string,
    @Body() updateDelegationDto: UpdateDelegationDto,
  ) {
    return this.delegationsService.update(id, updateDelegationDto);
  }

  @Delete(':id')
  @RequirePermissions(Permission.FORWARD_LEAVE)
  remove(@Param('id') id: string) {
    return this.delegationsService.remove(id);
  }
}
