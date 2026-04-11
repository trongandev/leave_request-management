/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { envValidationSchema } from './config/env.validation';
import { DatabaseConfig } from './config/database.config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionsFilter } from './common/dto/filters/http-exception.filter';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { DatabaseModule } from './database/database.module';
import { PermissionModule } from './permission/permission.module';
import { ProfileModule } from './profile/profile.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { PermissionsGuard } from './auth/guards/permissions.guard';
import { CountersModule } from './counters/counters.module';
import { DepartmentsModule } from './departments/departments.module';
import { PositionsModule } from './positions/positions.module';
import { ErrorLogModule } from './error-log/error-log.module';
import { LeaveBalancesModule } from './leave-balances/leave-balances.module';
import { SystemSettingModule } from './system-setting/system-setting.module';
import { ScheduleModule } from '@nestjs/schedule';
import { FormTemplateModule } from './form-template/form-template.module';
import { RequestsModule } from './requests/requests.module';
import { ApprovalStepsModule } from './approval-steps/approval-steps.module';
import { DelegationsModule } from './delegations/delegations.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AuditLogsModule } from './audit-logs/audit-logs.module';
import { ApprovalStepsFlowLogModule } from './approval-steps-flow-log/approval-steps-flow-log.module';
import { PushNotiModule } from './push-noti/push-noti.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AuditInterceptor } from './common/dto/interceptors/audit.interceptor';
import { join } from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/adapters/handlebars.adapter';
@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          service: 'gmail',
          auth: {
            type: 'OAuth2',
            user: configService.get<string>('MAIL_SERVER') as string,
            clientId: configService.get<string>('MAIL_CLIENT_ID') as string,
            clientSecret: configService.get<string>(
              'MAIL_CLIENT_SECRET',
            ) as string,
            refreshToken: configService.get<string>(
              'MAIL_REFRESH_TOKEN',
            ) as string,
          },
        },
        defaults: {
          from: '"LRM System" <noreply@lrm-bos.com>',
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    ConfigModule.forRoot({
      validationSchema: envValidationSchema,
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI') as string,
      }),
    }),
    UsersModule,
    AuthModule,
    RolesModule,
    DatabaseModule,
    PermissionModule,
    ProfileModule,
    CountersModule,
    DepartmentsModule,
    PositionsModule,
    ErrorLogModule,
    LeaveBalancesModule,
    SystemSettingModule,
    FormTemplateModule,
    RequestsModule,
    ApprovalStepsModule,
    DelegationsModule,
    NotificationsModule,
    AuditLogsModule,
    ApprovalStepsFlowLogModule,
    PushNotiModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    DatabaseConfig,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditInterceptor,
    },
  ],
  exports: [DatabaseConfig],
})
export class AppModule {}
