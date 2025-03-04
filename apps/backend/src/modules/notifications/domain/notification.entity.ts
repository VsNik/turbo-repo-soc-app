import { randomUUID } from 'crypto';
import { NotificationObject } from './notification-object';

export class Notification {
  id: string;
  notifyObject: NotificationObject;
  receiveId: string;
  isRead: boolean;

  constructor(notifyObj: NotificationObject, receiveId: string) {
    this.id = randomUUID();
    this.notifyObject = notifyObj;
    this.receiveId = receiveId;
    this.isRead = false;
  }
}
