import { Controller, Post, UseGuards } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { Permission } from '../enum/permission.enum';
import { RequirePermissions } from '../auth/decorators/permissions.decorator';

@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post('sync')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions(Permission.MANAGE_ROLES) // Chỉ Admin mới được bấm nút Sync
  // đồng bộ quyền từ Enum trong file permission.enum.ts vào MongoDB
  async sync() {
    return await this.permissionService.syncPermissions();
  }
}
