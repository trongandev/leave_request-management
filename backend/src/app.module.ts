import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { envValidationSchema } from './config/env.validation';
import { DatabaseConfig } from './config/database.config';
import { ErrorLog, ErrorLogSchema } from './logs/error-log.schema';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './common/dto/filters/http-exception.filter';
import { LogsModule } from './logs/logs.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { DatabaseModule } from './database/database.module';
import { PermissionModule } from './permission/permission.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: envValidationSchema,
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI') as string,
      }),
    }),
    MongooseModule.forFeature([
      { name: ErrorLog.name, schema: ErrorLogSchema },
    ]),

    UsersModule,

    LogsModule,

    AuthModule,

    RolesModule,

    DatabaseModule,

    PermissionModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    DatabaseConfig,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
  exports: [DatabaseConfig],
})
export class AppModule {}
