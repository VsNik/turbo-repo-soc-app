import { Notification } from './notification.entity';

export const NOTIFY_REPO = Symbol('NOTIFY_REPO');

export interface INotifyRepository {
  create(entity: Notification): Notification;
  findById(id: string): Promise<Notification>;
  getByUserId(userId: string): Promise<Notification[]>;
  delete(entity: Notification): Promise<void>;
  flush(): Promise<void>;
}
