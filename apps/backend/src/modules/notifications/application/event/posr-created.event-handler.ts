import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PostCreatedEvent } from 'src/modules/posts/domain';
import { NotifyGateway } from '../../notifications.gateway';
import {
  Notification,
  INotifyObjectRepository,
  INotifyRepository,
  NotificationObject,
  NOTIFY_OBJECT_REPO,
  NOTIFY_REPO,
} from '../../domain';
import { Inject } from '@nestjs/common';
import { NotificationType } from 'src/common/types';

@EventsHandler(PostCreatedEvent)
export class PostCreatedEventHandler
  implements IEventHandler<PostCreatedEvent>
{
  constructor(
    private readonly gateway: NotifyGateway,
    @Inject(NOTIFY_REPO) private readonly notifyRepo: INotifyRepository,
    @Inject(NOTIFY_OBJECT_REPO)
    private readonly notifyObjRepo: INotifyObjectRepository,
  ) {}

  async handle({ post, user, recipientIDs }: PostCreatedEvent) {
    const notifyObj = this.notifyObjRepo.create(
      new NotificationObject(
        user, // issuer
        NotificationType.NewPost,
        post,
      ),
    );

    const notify: Notification[] = [];
    recipientIDs.map((id) => {
      const notifyEntity = new Notification(notifyObj, id);
      notify.push(this.notifyRepo.create(notifyEntity));
    });

    const result = notify.map((item) => {
      const resultNotify = item.formatNotify();
      return resultNotify;
    });

    await this.notifyRepo.flush();
    this.gateway.emitNotification(result);
  }
}
