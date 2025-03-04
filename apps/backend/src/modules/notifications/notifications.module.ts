import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import {
  COMMAND_HANDLERS,
  EVENT_HANDLERS,
  QUERY_HANDLERS,
} from './application';
import { NOTIFY_OBJECT_REPO, NOTIFY_REPO } from './domain';
import { NotifyObjectRepository, NotifyRepository } from './infrastructure';
import { NotificationsController } from './notifications.controller';
import { NotificationsGateway } from './notifications.gateway';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [CqrsModule, JwtModule],
  providers: [
    ...COMMAND_HANDLERS,
    ...QUERY_HANDLERS,
    ...EVENT_HANDLERS,
    {
      provide: NOTIFY_REPO,
      useClass: NotifyRepository,
    },
    {
      provide: NOTIFY_OBJECT_REPO,
      useClass: NotifyObjectRepository,
    },
    NotificationsGateway,
  ],
  controllers: [NotificationsController],
})
export class NotificationsModule {}
