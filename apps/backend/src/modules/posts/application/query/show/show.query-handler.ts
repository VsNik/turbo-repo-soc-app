import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ShowQuery } from './show.query';
import { IPostsRepository, POSTS_REPO } from 'src/modules/posts/domain';
import { Inject, NotFoundException } from '@nestjs/common';
import { IPost } from 'src/modules/posts/infrastructure';

const POST_NOT_FOUND = 'Post not found.';

@QueryHandler(ShowQuery)
export class ShowQueryHandler implements IQueryHandler<ShowQuery, IPost> {
  constructor(
    @Inject(POSTS_REPO) private readonly postsRepo: IPostsRepository,
  ) {}

  async execute({ postId, currentUser }: ShowQuery): Promise<IPost> {
    const post = await this.postsRepo.findOne(postId);
    if (!post) {
      throw new NotFoundException(POST_NOT_FOUND);
    }

    return post.toJSON(currentUser);
  }
}
