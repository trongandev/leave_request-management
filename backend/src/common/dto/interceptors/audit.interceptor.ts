import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { Observable, tap } from 'rxjs';
import type { Request } from 'express';
import { CreateAuditLogDto } from '../../../audit-logs/dto/create-audit-log.dto';
import {
  AUDIT_LOG_CREATED_EVENT,
  SYSTEM_BOT_USER_ID,
} from '../../../audit-logs/constants/audit-log.constants';
import { AuditAction } from '../../../enum/audit-action.enum';
import { AuditModule } from '../../../enum/audit-module.enum';

type AuditTargetConfig = {
  module: AuditModule;
  modelName?: string;
};

type IdLike = string | { toString(): string } | { _id?: unknown } | undefined;

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  private readonly logger = new Logger(AuditInterceptor.name);

  private readonly API_PREFIXES = ['/api', '/v1'];

  private readonly MUTATING_METHODS = new Set([
    'POST',
    'PUT',
    'PATCH',
    'DELETE',
  ]);

  private readonly TARGET_CONFIG: Record<string, AuditTargetConfig> = {
    requests: { module: AuditModule.REQUEST, modelName: 'Request' },
    'approval-steps': {
      module: AuditModule.APPROVAL_STEP,
      modelName: 'ApprovalStep',
    },
    delegations: { module: AuditModule.DELEGATION, modelName: 'Delegation' },
    users: { module: AuditModule.USER, modelName: 'User' },
    'leave-balances': {
      module: AuditModule.LEAVE_BALANCE,
      modelName: 'LeaveBalance',
    },
    'form-template': {
      module: AuditModule.FORM_TEMPLATE,
      modelName: 'FormTemplate',
    },
    roles: { module: AuditModule.ROLE, modelName: 'Role' },
    departments: { module: AuditModule.DEPARTMENT, modelName: 'Department' },
    positions: { module: AuditModule.POSITION, modelName: 'Position' },
    'system-setting': {
      module: AuditModule.SYSTEM_SETTING,
      modelName: 'SystemSetting',
    },
    auth: { module: AuditModule.AUTH },
    notifications: {
      module: AuditModule.NOTIFICATION,
      modelName: 'Notification',
    },
  };

  // Log only business-critical mutations to avoid noisy audit table growth.
  private readonly IMPORTANT_ROUTE_PATTERNS: ReadonlyArray<{
    method: string;
    pattern: RegExp;
  }> = [
    { method: 'POST', pattern: /^\/auth\/login$/ },
    { method: 'POST', pattern: /^\/requests$/ },
    { method: 'PATCH', pattern: /^\/requests\/.+/ },
    { method: 'DELETE', pattern: /^\/requests\/.+/ },
    {
      method: 'PATCH',
      pattern: /^\/approval-steps\/.+\/(approve|reject|return|delegate)$/,
    },
    { method: 'POST', pattern: /^\/delegations$/ },
    { method: 'PATCH', pattern: /^\/delegations\/.+/ },
    { method: 'DELETE', pattern: /^\/delegations\/.+/ },
    { method: 'POST', pattern: /^\/leave-balances$/ },
    { method: 'PATCH', pattern: /^\/leave-balances\/.+/ },
    { method: 'DELETE', pattern: /^\/leave-balances\/.+/ },
    { method: 'POST', pattern: /^\/users$/ },
    { method: 'PATCH', pattern: /^\/users\/.+/ },
    { method: 'DELETE', pattern: /^\/users\/.+/ },
    { method: 'POST', pattern: /^\/form-template$/ },
    { method: 'PATCH', pattern: /^\/form-template\/.+/ },
    { method: 'DELETE', pattern: /^\/form-template\/.+/ },
    { method: 'POST', pattern: /^\/roles$/ },
    { method: 'PATCH', pattern: /^\/roles\/.+/ },
    { method: 'DELETE', pattern: /^\/roles\/.+/ },
    { method: 'POST', pattern: /^\/departments$/ },
    { method: 'PATCH', pattern: /^\/departments\/.+/ },
    { method: 'DELETE', pattern: /^\/departments\/.+/ },
    { method: 'POST', pattern: /^\/positions$/ },
    { method: 'PATCH', pattern: /^\/positions\/.+/ },
    { method: 'DELETE', pattern: /^\/positions\/.+/ },
    { method: 'POST', pattern: /^\/system-setting$/ },
    { method: 'PATCH', pattern: /^\/system-setting\/.+/ },
    { method: 'DELETE', pattern: /^\/system-setting\/.+/ },
    { method: 'POST', pattern: /^\/notifications$/ },
    { method: 'PATCH', pattern: /^\/notifications\/.+/ },
    { method: 'DELETE', pattern: /^\/notifications\/.+/ },
  ];

  constructor(
    private readonly eventEmitter: EventEmitter2,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    if (context.getType() !== 'http') {
      return next.handle();
    }

    const request = context.switchToHttp().getRequest<Request>();
    const method = String(request.method).toUpperCase();

    if (!this.MUTATING_METHODS.has(method)) {
      return next.handle();
    }

    const path = this.normalizePath(this.getRequestPath(request));
    if (this.shouldSkipPath(path)) {
      return next.handle();
    }

    const config = this.resolveConfig(path);
    if (!this.shouldAuditRoute(method, path, config)) {
      return next.handle();
    }

    const action = this.resolveAction(method, path);
    const resourceIdForLookupPromise = this.resolveResourceIdForLookup(
      request,
      path,
      config?.modelName,
    );
    const oldValuePromise = this.fetchOldValueByLookup(
      config?.modelName,
      resourceIdForLookupPromise,
      method,
    );

    return next.handle().pipe(
      tap((responseData) => {
        void this.emitAuditLog({
          request,
          path,
          action,
          config,
          responseData,
          resourceIdForLookupPromise,
          oldValuePromise,
        });
      }),
    );
  }

  private shouldSkipPath(path: string): boolean {
    return path.startsWith('/audit-logs');
  }

  private getRequestPath(request: Request): string {
    const original = request.originalUrl || request.url || '';
    return original.split('?')[0] || '/';
  }

  private normalizePath(path: string): string {
    let normalized = path || '/';

    for (const prefix of this.API_PREFIXES) {
      if (normalized === prefix) {
        normalized = '/';
        break;
      }

      if (normalized.startsWith(`${prefix}/`)) {
        normalized = normalized.slice(prefix.length);
        break;
      }
    }

    return normalized.startsWith('/') ? normalized : `/${normalized}`;
  }

  private resolveConfig(path: string): AuditTargetConfig | undefined {
    const firstSegment = path.split('/').filter(Boolean)[0]?.toLowerCase();

    if (!firstSegment) {
      return undefined;
    }

    return this.TARGET_CONFIG[firstSegment];
  }

  private resolveAction(method: string, path: string): AuditAction {
    if (path === '/auth/login' && method === 'POST') {
      return AuditAction.LOGIN;
    }

    if (path.startsWith('/approval-steps/')) {
      if (path.endsWith('/approve')) {
        return AuditAction.APPROVE;
      }
      if (path.endsWith('/reject')) {
        return AuditAction.REJECT;
      }
      if (path.endsWith('/return')) {
        return AuditAction.RETURN;
      }
      if (path.endsWith('/delegate')) {
        return AuditAction.DELEGATE;
      }
    }

    if (method === 'POST') {
      return AuditAction.CREATE;
    }

    if (method === 'PUT' || method === 'PATCH') {
      return AuditAction.UPDATE;
    }

    if (method === 'DELETE') {
      return AuditAction.DELETE;
    }

    return AuditAction.UPDATE;
  }

  private isImportantRoute(method: string, path: string): boolean {
    return this.IMPORTANT_ROUTE_PATTERNS.some(
      (item) => item.method === method && item.pattern.test(path),
    );
  }

  private shouldAuditRoute(
    method: string,
    path: string,
    config?: AuditTargetConfig,
  ): boolean {
    if (this.isImportantRoute(method, path)) {
      return true;
    }

    // Fallback rule: any mutating route under known business modules is audited.
    return Boolean(config);
  }

  private extractParamId(request: Request): string | undefined {
    const paramValue = (request.params as any)?.id;
    return this.toIdString(paramValue);
  }

  private async resolveResourceIdForLookup(
    request: Request,
    path: string,
    modelName: string | undefined,
  ): Promise<string | undefined> {
    const paramId = this.extractParamId(request);
    if (paramId) {
      return paramId;
    }

    if (path === '/users/manager' && modelName === 'User') {
      const body = (request.body ?? {}) as Record<string, unknown>;
      const empId = typeof body.empId === 'string' ? body.empId : undefined;

      if (!empId) {
        return undefined;
      }

      const userModel = this.connection.models[modelName];
      if (!userModel) {
        return undefined;
      }

      const user = await userModel
        .findOne({ empId })
        .select('_id')
        .lean<{ _id?: unknown }>()
        .exec();

      return this.toIdString(user?._id as IdLike);
    }

    return undefined;
  }

  private async fetchOldValueByLookup(
    modelName: string | undefined,
    resourceIdPromise: Promise<string | undefined>,
    method: string,
  ): Promise<Record<string, unknown> | undefined> {
    if (!modelName || !['PUT', 'PATCH', 'DELETE'].includes(method)) {
      return undefined;
    }

    const resourceId = await resourceIdPromise;
    if (!resourceId) {
      return undefined;
    }

    const model = this.connection.models[modelName];
    if (!model) {
      return undefined;
    }

    const oldValue = await model.findById(resourceId).lean().exec();
    if (!oldValue || typeof oldValue !== 'object') {
      return undefined;
    }

    return oldValue as Record<string, unknown>;
  }

  private extractResponseEntity(
    responseData: unknown,
    visited: Set<object> = new Set<object>(),
    depth = 0,
  ): Record<string, unknown> | undefined {
    if (depth > 6) {
      return undefined;
    }

    if (!responseData || typeof responseData !== 'object') {
      return undefined;
    }

    const payload = responseData as Record<string, unknown>;
    if (visited.has(payload)) {
      return undefined;
    }
    visited.add(payload);

    if (payload.item && typeof payload.item === 'object') {
      return payload.item as Record<string, unknown>;
    }

    if (payload.data && typeof payload.data === 'object') {
      return this.extractResponseEntity(payload.data, visited, depth + 1);
    }

    if (this.toIdString(payload._id as IdLike)) {
      return payload;
    }

    return undefined;
  }

  private extractUserId(params: {
    request: Request;
    responseData: unknown;
    body: Record<string, unknown>;
    path: string;
  }): string {
    const requestUser = params.request.user as
      | { _id?: unknown; id?: unknown; sub?: unknown; userId?: unknown }
      | undefined;

    const rawUserId =
      this.toIdString(requestUser?._id as IdLike) ??
      this.toIdString(requestUser?.id as IdLike) ??
      this.toIdString(requestUser?.sub as IdLike) ??
      this.toIdString(requestUser?.userId as IdLike);

    if (rawUserId) {
      return rawUserId;
    }

    const actorFromResponse = this.extractActorIdFromResponse(
      params.responseData,
    );
    if (actorFromResponse) {
      return actorFromResponse;
    }

    if (params.path === '/auth/login') {
      const actorFromBody = this.toIdString(params.body.userId as IdLike);
      if (actorFromBody) {
        return actorFromBody;
      }
    }

    return SYSTEM_BOT_USER_ID;
  }

  private extractActorIdFromResponse(
    responseData: unknown,
  ): string | undefined {
    const root = this.toObjectRecord(responseData);
    if (!root) {
      return undefined;
    }

    const rootData = this.toObjectRecord(root.data);
    const rootItem = this.toObjectRecord(root.item);
    const userFromRoot = this.toObjectRecord(root.user);
    const userFromData = this.toObjectRecord(rootData?.user);
    const userFromItem = this.toObjectRecord(rootItem?.user);

    const candidates: Array<Record<string, unknown> | undefined> = [
      userFromRoot,
      userFromData,
      userFromItem,
      root,
      rootData,
      rootItem,
    ];

    for (const candidate of candidates) {
      if (!candidate) {
        continue;
      }

      const actorId =
        this.toIdString(candidate._id as IdLike) ??
        this.toIdString(candidate.id as IdLike) ??
        this.toIdString(candidate.sub as IdLike) ??
        this.toIdString(candidate.userId as IdLike);

      if (actorId) {
        return actorId;
      }
    }

    return undefined;
  }

  private toObjectRecord(value: unknown): Record<string, unknown> | undefined {
    if (!value || typeof value !== 'object') {
      return undefined;
    }

    return value as Record<string, unknown>;
  }

  private extractIp(request: Request): string | undefined {
    const forwarded = request.headers['x-forwarded-for'];
    if (typeof forwarded === 'string' && forwarded.length > 0) {
      return forwarded.split(',')[0]?.trim();
    }

    return request.ip;
  }

  private sanitizeSensitiveData(
    data: Record<string, unknown>,
  ): Record<string, unknown> {
    const sensitiveFields = new Set([
      'password',
      'passwordHash',
      'refreshToken',
      'accessToken',
      'token',
      'secret',
      'apiKey',
      'creditCard',
      'ssn',
      'phone',
    ]);

    const result: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(data)) {
      if (sensitiveFields.has(key.toLowerCase())) {
        result[key] = '***REDACTED***';
      } else if (value && typeof value === 'object' && !Array.isArray(value)) {
        result[key] = this.sanitizeSensitiveData(
          value as Record<string, unknown>,
        );
      } else if (Array.isArray(value)) {
        result[key] = value.map((item) => {
          if (item && typeof item === 'object') {
            return this.sanitizeSensitiveData(item as Record<string, unknown>);
          }
          return item;
        });
      } else {
        result[key] = value;
      }
    }

    return result;
  }

  private buildDescription(params: {
    userId: string;
    action: AuditAction;
    moduleName: AuditModule;
    path: string;
  }): string {
    const now = new Date();
    const formatted = now.toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Asia/Ho_Chi_Minh',
    });
    return `[${formatted}] Người dùng ${params.userId} đã thực hiện ${params.action} trên ${params.moduleName} (${params.path})`;
  }

  private async emitAuditLog(params: {
    request: Request;
    path: string;
    action: AuditAction;
    config?: AuditTargetConfig;
    responseData: unknown;
    resourceIdForLookupPromise: Promise<string | undefined>;
    oldValuePromise: Promise<Record<string, unknown> | undefined>;
  }): Promise<void> {
    try {
      const oldValue = await params.oldValuePromise;
      const responseEntity: any = this.extractResponseEntity(
        params.responseData,
      );
      const body = (params.request.body ?? {}) as Record<any, any>;

      const resourceIdFromLookup = await params.resourceIdForLookupPromise;
      const resourceId =
        resourceIdFromLookup ??
        this.toIdString(responseEntity?._id) ??
        this.toIdString(body._id);

      const newValue =
        params.action === AuditAction.DELETE
          ? undefined
          : (responseEntity ??
            (Object.keys(body).length > 0 ? body : undefined));

      const moduleName: AuditModule =
        params.config?.module ?? this.getFallbackModule(params.path);
      const userId = this.extractUserId({
        request: params.request,
        responseData: params.responseData,
        body,
        path: params.path,
      });

      const payload: CreateAuditLogDto = {
        userId,
        action: params.action,
        module: moduleName,
        resourceId,
        oldValue: oldValue ? this.sanitizeSensitiveData(oldValue) : oldValue,
        newValue: newValue ? this.sanitizeSensitiveData(newValue) : newValue,
        ipAddress: this.extractIp(params.request),
        userAgent: params.request.headers['user-agent'],
        description: this.buildDescription({
          userId,
          action: params.action,
          moduleName,
          path: params.path,
        }),
      };

      this.eventEmitter.emit(AUDIT_LOG_CREATED_EVENT, payload);
    } catch (error) {
      this.logger.error('Failed to emit audit log event', error as Error);
    }
  }

  private getFallbackModule(path: string): AuditModule {
    const firstSegment = path.split('/').filter(Boolean)[0]?.toLowerCase();
    return (
      this.TARGET_CONFIG[firstSegment ?? '']?.module ?? AuditModule.UNKNOWN
    );
  }

  private toIdString(input: IdLike): string | undefined {
    return this.toIdStringSafe(input, new Set<object>(), 0);
  }

  private toIdStringSafe(
    input: IdLike,
    visited: Set<object>,
    depth: number,
  ): string | undefined {
    if (depth > 6) {
      return undefined;
    }

    if (!input) {
      return undefined;
    }

    if (typeof input === 'string') {
      return input.length > 0 ? input : undefined;
    }

    if (typeof input === 'object') {
      if (visited.has(input)) {
        return undefined;
      }
      visited.add(input);

      if ('_id' in input) {
        return this.toIdStringSafe(
          (input as { _id?: unknown })._id as IdLike,
          visited,
          depth + 1,
        );
      }
    }

    if (
      typeof (input as { toHexString?: unknown }).toHexString === 'function'
    ) {
      const value = (input as { toHexString(): string }).toHexString();
      return value && value !== '[object Object]' ? value : undefined;
    }

    if (typeof (input as { toString?: unknown }).toString === 'function') {
      const value = (input as { toString(): string }).toString();
      return value && value !== '[object Object]' ? value : undefined;
    }

    return undefined;
  }
}
