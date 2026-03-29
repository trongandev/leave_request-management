import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SystemSettingService } from './system-setting.service';
import { CreateSystemSettingDto } from './dto/create-system-setting.dto';
import { UpdateSystemSettingDto } from './dto/update-system-setting.dto';
import { AuthGuard } from '@nestjs/passport';
import { RequirePermissions } from '../auth/decorators/permissions.decorator';
import { Permission } from '../enum/permission.enum';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('system-setting')
@ApiBearerAuth()
export class SystemSettingController {
  constructor(private readonly systemSettingService: SystemSettingService) {}

  // Config write endpoint (restricted) for creating new policy keys.
  @Post()
  @UseGuards(AuthGuard('jwt'))
  @RequirePermissions(Permission.MANAGE_LEAVE_TYPES)
  create(@Body() createSystemSettingDto: CreateSystemSettingDto) {
    return this.systemSettingService.create(createSystemSettingDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @RequirePermissions(Permission.MANAGE_LEAVE_TYPES)
  findAll() {
    return this.systemSettingService.findAll();
  }

  // Key-based read endpoint used by policy-driven modules.
  @Get('key/:key')
  @UseGuards(AuthGuard('jwt'))
  @RequirePermissions(Permission.MANAGE_LEAVE_TYPES)
  findByKey(@Param('key') key: string) {
    return this.systemSettingService.findOneByKey(key);
  }

  // Key-based upsert endpoint to safely update policy values.
  @Patch('key/:key')
  @UseGuards(AuthGuard('jwt'))
  @RequirePermissions(Permission.MANAGE_LEAVE_TYPES)
  updateByKey(
    @Param('key') key: string,
    @Body() updateSystemSettingDto: UpdateSystemSettingDto,
  ) {
    return this.systemSettingService.updateByKey(key, updateSystemSettingDto);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @RequirePermissions(Permission.MANAGE_LEAVE_TYPES)
  findOne(@Param('id') id: string) {
    return this.systemSettingService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @RequirePermissions(Permission.MANAGE_LEAVE_TYPES)
  update(
    @Param('id') id: string,
    @Body() updateSystemSettingDto: UpdateSystemSettingDto,
  ) {
    return this.systemSettingService.update(id, updateSystemSettingDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @RequirePermissions(Permission.MANAGE_LEAVE_TYPES)
  remove(@Param('id') id: string) {
    return this.systemSettingService.remove(id);
  }
}
