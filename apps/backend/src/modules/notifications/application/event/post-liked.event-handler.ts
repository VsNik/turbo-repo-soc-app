import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PostLikedEvent } from 'src/modules/posts/domain';
import { NotifyGateway } from '../../notifications.gateway';
import {
  INotifyObjectRepository,
  NotificationObject,
  Notification,
  INotifyRepository,
  NOTIFY_REPO,
  NOTIFY_OBJECT_REPO,
} from '../../domain';
import { NotificationType } from 'src/common/types';
import { Inject } from '@nestjs/common';

@EventsHandler(PostLikedEvent)
export class PostLikedEventHandler implements IEventHandler<PostLikedEvent> {
  constructor(
    private readonly gateway: NotifyGateway,
    @Inject(NOTIFY_REPO) private readonly notifyRepo: INotifyRepository,
    @Inject(NOTIFY_OBJECT_REPO)
    private readonly notifyObjRepo: INotifyObjectRepository,
  ) {}

  async handle({ post, user }: PostLikedEvent) {
    const recipientId = post.author.id;

    const notifyObjEntity = new NotificationObject(
      user, // issuer
      NotificationType.Like,
      post,
    );

    const notifyObj = this.notifyObjRepo.create(notifyObjEntity);
    const notifyEntity = new Notification(notifyObj, recipientId);
    const notify = this.notifyRepo.create(notifyEntity);

    const resultNotify = notify.formatNotify();

    await this.notifyRepo.flush();
    this.gateway.emitNotification([resultNotify]);
  }
}
