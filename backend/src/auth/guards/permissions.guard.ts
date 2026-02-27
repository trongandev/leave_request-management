import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSION_KEY } from '../decorators/permissions.decorator';

interface User {
  role?: {
    permissions?: string[];
  };
}

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Lấy danh sách quyền yêu cầu từ Decorator
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions) {
      return true; // Nếu API không yêu cầu quyền cụ thể, cho phép truy cập
    }

    const { user }: { user: User } = context.switchToHttp().getRequest();

    // Kiểm tra User có role và permissions không
    const userPermissions = user.role?.permissions || [];

    // Trả về true nếu user có ít nhất 1 trong các quyền yêu cầu
    return requiredPermissions.some((permission) =>
      userPermissions.includes(permission),
    );
  }
}
