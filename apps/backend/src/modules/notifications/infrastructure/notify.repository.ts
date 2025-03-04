import { Injectable } from '@nestjs/common';
import { INotifyRepository } from '../domain';
import { Notification } from '../domain';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';

@Injectable()
export class NotifyRepository implements INotifyRepository {
  private em: EntityManager;
  private repository: EntityRepository<Notification>;

  constructor(em: EntityManager) {
    this.em = em;
    this.repository = em.getRepository(Notification);
  }

  create(user: Notification): Notification {
    const result = this.repository.create(user);
    return result;
  }

  async findById(id: string): Promise<Notification> {
    return this.repository.findOne({
      id,
    });
  }

  async getByUserId(userId: string): Promise<Notification[]> {
    return this.repository.find({
      receiveId: userId,
    });
  }

  async delete(entity: Notification): Promise<void> {
    await this.em.removeAndFlush(entity);
  }

  async flush() {
    await this.em.flush();
  }
}
