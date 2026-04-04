/* eslint-disable @typescript-eslint/require-await */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseConfig } from '../config/database.config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/users.schema';
import { Role, RoleSchema } from '../roles/roles.schema';
import { UsersModule } from '../users/users.module';
import {
  LeaveBalance,
  LeaveBalanceSchema,
} from 'src/leave-balances/leave-balances.schema';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
      { name: LeaveBalance.name, schema: LeaveBalanceSchema },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const expiresIn = (configService.get<string>('JWT_EXPIRES1') ||
          '10s') as unknown as number;
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, JwtStrategy, DatabaseConfig],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
