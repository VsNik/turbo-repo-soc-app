import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PostCommentedEvent } from 'src/modules/comments/domain/events';
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

@EventsHandler(PostCommentedEvent)
export class PostCommentedEventHandler
  implements IEventHandler<PostCommentedEvent>
{
  constructor(
    private readonly gateway: NotifyGateway,
    @Inject(NOTIFY_REPO) private readonly notifyRepo: INotifyRepository,
    @Inject(NOTIFY_OBJECT_REPO)
    private readonly notifyObjRepo: INotifyObjectRepository,
  ) {}

  async handle({ post, user }: PostCommentedEvent) {
    const recipientId = post.author.id;

    const notifyObjEntity = new NotificationObject(
      user, // issuer
      NotificationType.Comment,
      post,
    );

    const notifyObj = this.notifyObjRepo.create(notifyObjEntity);
    const notifyEntity = new Notification(notifyObj, recipientId);
    const notify = this.notifyRepo.create(notifyEntity);

    const resultNotify = notify.formatNotify();

    await this.notifyRepo.flush();

    console.log(resultNotify);

    this.gateway.emitNotification([resultNotify]);
  }
}
