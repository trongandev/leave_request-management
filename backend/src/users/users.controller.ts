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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RequirePermissions } from '../auth/decorators/permissions.decorator';
import { Permission } from '../enum/permission.enum';
import { AssignManagerDto, RemoveManagerDto } from './dto/assign-manager.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { QueryUsersDto } from './dto/query-users.dto';

@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @RequirePermissions('MANAGE_USERS')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('teams')
  @UseGuards(AuthGuard('jwt'))
  getTeamMembers(@CurrentUser() user: any) {
    return this.usersService.getTeamMembers(user);
  }

  @Post('fake')
  @UseGuards(AuthGuard('jwt'))
  @RequirePermissions('MANAGE_USERS')
  createFakeUser(@Query('count') count: number) {
    return this.usersService.createFakeUser(count);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @RequirePermissions('ASSIGN_MANAGER')
  findAll(@Query() queryUsersDto: QueryUsersDto) {
    return this.usersService.findAll(queryUsersDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch('manager')
  @UseGuards(AuthGuard('jwt'))
  @RequirePermissions('ASSIGN_MANAGER')
  assignManager(@Body() dto: AssignManagerDto, @CurrentUser() user: any) {
    return this.usersService.assignManagerByEmpId(
      dto.empId,
      dto.managerId,
      user,
    );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete('manager')
  @UseGuards(AuthGuard('jwt'))
  @RequirePermissions(Permission.ASSIGN_MANAGER)
  removeManager(@Body() dto: RemoveManagerDto, @CurrentUser() user: any) {
    return this.usersService.removeManagerByEmpId(dto.empId, user);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
