import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseConfig {
  constructor(private configService: ConfigService) {}

  get NODE_ENV(): string {
    return this.configService.get<string>('NODE_ENV') || 'development';
  }

  get PORT(): number {
    return this.configService.get<number>('PORT') || 5050;
  }

  get JWT_SECRET(): string {
    return this.configService.get<string>('JWT_SECRET') || '';
  }

  get JWT_EXPIRES(): string {
    return this.configService.get<string>('JWT_EXPIRES') || '1d';
  }

  get MONGO_URI(): string {
    return (
      this.configService.get<string>('MONGO_URI') ||
      'mongodb://localhost:27017/lrm'
    );
  }
}
