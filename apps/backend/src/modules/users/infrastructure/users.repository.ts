import {
  EntityManager,
  EntityRepository,
  QueryOrder,
} from '@mikro-orm/postgresql';
import { IUsersRepository, User } from '../domain';
import { Injectable } from '@nestjs/common';
import { Relation } from './types';

@Injectable()
export class UsersRepository implements IUsersRepository {
  private repository: EntityRepository<User>;
  private em: EntityManager;

  constructor(em: EntityManager) {
    this.em = em;
    this.repository = em.getRepository(User);
  }

  async create(entity: User): Promise<User> {
    const result = this.repository.create(entity);
    await this.em.flush();
    return result;
  }

  async findById(id: string, relations?: Relation[]): Promise<User> {
    return this.repository.findOne({ id }, { populate: relations ?? null });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.repository.findOne({ username });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({ email });
  }

  async getSuggested(userId: string): Promise<User[]> {
    return this.repository.findAll({
      where: {
        id: { $ne: userId },
        following: {
          $none: { id: userId },
        },
      },
      orderBy: { createdAt: QueryOrder.DESC },
      limit: 5,
    });
  }

  async search(query: string, currentId: string) {
    return this.repository.findAll({
      where: {
        // [sql`lower(display_name)`]: {
        //   $like: `${query ? query.toLocaleLowerCase() : ''}%`,
        // },
        displayName: {
          $like: `${query}%`,
        },
        id: { $ne: currentId },
      },
      orderBy: { createdAt: QueryOrder.DESC },
    });
  }

  async flush() {
    await this.em.flush();
  }
}
