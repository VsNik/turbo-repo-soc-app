import { EntitySchema } from '@mikro-orm/postgresql';
import { NotificationObject } from '../domain';
import { User } from '../../../modules/users/domain';
import { NotificationType } from '../../../common/types';

export const notificationObjectSchema = new EntitySchema<NotificationObject>({
  class: NotificationObject,
  tableName: 'notification-objects',

  properties: {
    id: { type: 'uuid', primary: true },
    issuer: { kind: 'm:1', entity: () => User, eager: true },
    post: {
      kind: 'm:1',
      entity: 'Post',
      nullable: true,
      default: null,
      eager: true,
    },
    type: {
      enum: true,
      items: () => NotificationType,
      default: NotificationType.Like,
    },
    createdAt: { type: 'Date', onCreate: () => new Date() },
  },
});
