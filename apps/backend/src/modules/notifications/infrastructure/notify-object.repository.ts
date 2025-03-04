import { Injectable } from '@nestjs/common';
import { InotifyObjectRepository, NotificationObject } from '../domain';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';

@Injectable()
export class NotifyObjectRepository implements InotifyObjectRepository {
  private em: EntityManager;
  private repository: EntityRepository<NotificationObject>;

  constructor(em: EntityManager) {
    this.em = em;
    this.repository = em.getRepository(NotificationObject);
  }

  create(user: NotificationObject): NotificationObject {
    const result = this.repository.create(user);
    return result;
  }
}
