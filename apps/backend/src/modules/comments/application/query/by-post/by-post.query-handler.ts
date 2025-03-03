import { Inject, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  COMMENTS_REPO,
  ICommentsRepository,
} from 'src/modules/comments/domain';
import { IPostsRepository, POSTS_REPO } from 'src/modules/posts/domain';
import { ByPostQuery } from './by-post.query';

const POST_NOT_FOUND = 'Post not found.';

@QueryHandler(ByPostQuery)
export class ByPostQueryHandler implements IQueryHandler<ByPostQuery> {
  constructor(
    @Inject(COMMENTS_REPO) private readonly commentsRepo: ICommentsRepository,
    @Inject(POSTS_REPO) private readonly postsRepo: IPostsRepository,
  ) {}

  async execute({
    postId,
    pagination,
    currentUser,
  }: ByPostQuery): Promise<any> {
    const post = await this.postsRepo.findOne(postId);

    if (!post) {
      throw new NotFoundException(POST_NOT_FOUND);
    }

    const results = await this.commentsRepo.findForPost(post.id, pagination);
    return results.map((comment) => comment.toJSON(currentUser));
  }
}
