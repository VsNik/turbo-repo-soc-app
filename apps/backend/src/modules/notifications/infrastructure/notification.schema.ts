import { EntitySchema } from '@mikro-orm/postgresql';
import { Notification, NotificationObject } from '../domain';

export const notificationSchema = new EntitySchema<Notification>({
  class: Notification,
  tableName: 'notifications',

  properties: {
    id: { type: 'uuid', primary: true },
    notifyObject: {
      kind: 'm:1',
      entity: () => NotificationObject,
      eager: true,
    },
    receiveId: { type: 'uuid' },
    isRead: { type: 'boolean', onCreate: () => false },
  },
});
