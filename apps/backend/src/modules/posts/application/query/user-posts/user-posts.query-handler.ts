import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserPostsQuery } from './user-posts.query';
import { IPost } from 'src/modules/posts/infrastructure';
import { Inject } from '@nestjs/common';
import { IPostsRepository, POSTS_REPO } from 'src/modules/posts/domain';

@QueryHandler(UserPostsQuery)
export class UserPostsQueryHandler
  implements IQueryHandler<UserPostsQuery, [IPost[], number]>
{
  constructor(
    @Inject(POSTS_REPO)
    private readonly postsRepo: IPostsRepository,
  ) {}

  async execute({
    userId,
    filter,
    currentUser,
  }: UserPostsQuery): Promise<[IPost[], number]> {
    const [data, count] = await this.postsRepo.findAll(filter, [userId]);
    return [data.map((post) => post.toJSON(currentUser)), count];
  }
}
