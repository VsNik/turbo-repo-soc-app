import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserFollowedEvent } from 'src/modules/users/domain';
import { NotifyGateway } from '../../notifications.gateway';
import {
  Notification,
  INotifyObjectRepository,
  INotifyRepository,
  NotificationObject,
  NOTIFY_OBJECT_REPO,
  NOTIFY_REPO,
} from '../../domain';
import { NotificationType } from 'src/common/types';

// issuer - отправитель
// recipient - получатель

@EventsHandler(UserFollowedEvent)
export class UserFollowedEventHandler
  implements IEventHandler<UserFollowedEvent>
{
  constructor(
    private readonly gateway: NotifyGateway,
    @Inject(NOTIFY_REPO) private readonly notifyRepo: INotifyRepository,
    @Inject(NOTIFY_OBJECT_REPO)
    private readonly notifyObjRepo: INotifyObjectRepository,
  ) {}

  async handle({ userId, followUser }: UserFollowedEvent) {
    const notifyObj = this.notifyObjRepo.create(
      new NotificationObject(
        followUser, // issuer
        NotificationType.Follow,
      ),
    );

    const notify = this.notifyRepo.create(new Notification(notifyObj, userId));

    // const notifyObjEntity = new NotificationObject(
    //   followUser, // issuer
    //   NotificationType.Follow,
    // );

    // const notifyObj = this.notifyObjRepo.create(notifyObjEntity);
    // const notifyEntity = new Notification(notifyObj, userId);
    // const notify = this.notifyRepo.create(notifyEntity);

    const resultNotify = notify.formatNotify();
    await this.notifyRepo.flush();

    this.gateway.emitNotification([resultNotify]);
  }
}
