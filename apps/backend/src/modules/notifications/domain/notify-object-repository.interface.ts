import { NotificationObject } from './notification-object';

export const NOTIFY_OBJECT_REPO = Symbol('NOTIFY_OBJECT_REPO');

export interface INotifyObjectRepository {
  create(user: NotificationObject): NotificationObject;
}
