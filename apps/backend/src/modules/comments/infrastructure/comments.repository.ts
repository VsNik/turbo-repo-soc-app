import { Injectable } from '@nestjs/common';
import { Comment, ICommentsRepository } from '../domain';
import {
  EntityManager,
  EntityRepository,
  QueryOrder,
} from '@mikro-orm/postgresql';
import { Pagination } from 'src/modules/posts/infrastructure';

@Injectable()
export class CommentsRepository implements ICommentsRepository {
  private repository: EntityRepository<Comment>;
  private em: EntityManager;

  constructor(em: EntityManager) {
    this.em = em;
    this.repository = em.getRepository(Comment);
  }

  async create(entity: Comment): Promise<Comment> {
    const comment = this.repository.create(entity);
    await this.flush();
    return comment;
  }

  async findById(id: string): Promise<Comment | null> {
    return this.repository.findOne({ id });
  }

  async findForPost(
    postId: string,
    { limit, page }: Pagination,
  ): Promise<Comment[]> {
    return this.repository.find(
      {
        post: { id: postId },
      },
      {
        limit,
        offset: limit * (page - 1),
        orderBy: { createdAt: QueryOrder.DESC },
        // populate: ['likes'],
      },
    );
  }

  async remove(entity: Comment): Promise<void> {
    await this.em.removeAndFlush(entity);
  }

  async flush(): Promise<void> {
    await this.em.flush();
  }
}
