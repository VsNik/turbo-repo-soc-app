import { Injectable } from '@nestjs/common';
import { IPostsRepository, Post } from '../domain';
import {
  EntityManager,
  EntityRepository,
  QueryBuilder,
  QueryOrder,
} from '@mikro-orm/postgresql';
import { PostsFilter } from './post.filter';

@Injectable()
export class PostsRepository implements IPostsRepository {
  private repository: EntityRepository<Post>;
  private em: EntityManager;

  constructor(em: EntityManager) {
    this.em = em;
    this.repository = em.getRepository(Post);
  }

  async create(entity: Post): Promise<Post> {
    return this.repository.create(entity);
    // await this.em.flush();
    // return post;
  }

  async findAll(
    filter: PostsFilter,
    authorIDs?: string[],
  ): Promise<[Post[], number]> {
    const { page, limit, type } = filter;

    const qb = this.getQueryBuilder();

    if (type) {
      qb.andWhere({ postType: type });
    }

    if (authorIDs) {
      qb.andWhere({ author: { id: { $in: authorIDs } } });
    }

    qb.limit(limit).offset(limit * (page - 1));
    qb.orderBy({ createdAt: QueryOrder.DESC });
    return qb.getResultAndCount();
  }

  async findOne(id: string): Promise<Post> {
    return this.repository.findOne({ id });
  }

  async findByIDs(
    filter: PostsFilter,
    postIDs: string[],
  ): Promise<[Post[], number]> {
    const { page, limit, type } = filter;

    const qb = this.getQueryBuilder();

    qb.andWhere({ id: { $in: postIDs } });

    if (type) {
      qb.andWhere({ postType: type });
    }

    qb.limit(limit).offset(limit * (page - 1));
    qb.orderBy({ createdAt: QueryOrder.DESC });

    return qb.getResultAndCount();
  }

  async remove(post: Post) {
    await this.em.removeAndFlush(post);
  }

  async flush() {
    await this.em.flush();
  }

  private getQueryBuilder(): QueryBuilder<Post> {
    return this.repository
      .createQueryBuilder('posts')
      .joinAndSelect('posts.author', 'a');
    // .leftJoinAndSelect('posts.likes', 'l');
  }
}
