import { EntityDTO, wrap } from '@mikro-orm/core';
import { randomUUID } from 'crypto';
import { NotificationType } from 'src/common/types';
import { Post } from 'src/modules/posts/domain';
import { User } from 'src/modules/users/domain';

export class NotificationObject {
  id: string;
  issuer: User;
  post?: Post;
  type: NotificationType;
  createdAt: string;

  constructor(issuer: User, type: NotificationType, post?: Post) {
    this.id = randomUUID();
    this.issuer = issuer;
    this.type = type;
    this.post = post;
  }

  toJSON(): EntityDTO<NotificationObject> {
    return wrap<NotificationObject>(this).toObject();
  }
}
