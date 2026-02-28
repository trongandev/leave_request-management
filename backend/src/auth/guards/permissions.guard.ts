import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSION_KEY } from '../decorators/permissions.decorator';
import { HydratedDocument } from 'mongoose';
import { User } from '@/users/users.schema';
import { Role } from '@/roles/roles.schema';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermission = this.reflector.getAllAndOverride<string>(
      PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );

    // Không yêu cầu quyền cụ thể → cho qua
    if (!requiredPermission) return true;

    const req = context
      .switchToHttp()
      .getRequest<{ user: HydratedDocument<User> }>();
    const user = req.user;

    // Lấy permissions từ roleId (đã populate trong JwtStrategy)
    const role = user?.roleId as unknown as Role;
    const userPermissions: string[] = role?.permissions ?? [];

    return userPermissions.includes(requiredPermission);
  }
}
