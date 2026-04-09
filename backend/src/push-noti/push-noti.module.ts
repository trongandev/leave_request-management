import { Module } from '@nestjs/common';
import { PushNotiGateway } from './push-noti.gateway';

@Module({ providers: [PushNotiGateway], exports: [PushNotiGateway] })
export class PushNotiModule {}
