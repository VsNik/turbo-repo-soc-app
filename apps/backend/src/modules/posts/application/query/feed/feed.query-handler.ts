import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FeedQuery } from './feed.query';
import { IPost } from 'src/modules/posts/infrastructure';
import { Inject } from '@nestjs/common';
import { IPostsRepository, POSTS_REPO } from 'src/modules/posts/domain';

@QueryHandler(FeedQuery)
export class FeedQueryHandler
  implements IQueryHandler<FeedQuery, [IPost[], number]>
{
  constructor(
    @Inject(POSTS_REPO)
    private readonly postsRepo: IPostsRepository,
  ) {}

  async execute({
    filter,
    currentUser,
  }: FeedQuery): Promise<[IPost[], number]> {
    const favoriteIDs = currentUser.favorites.getIdentifiers('id');
    const [data, count] = await this.postsRepo.findAll(filter, favoriteIDs);
    return [data.map((post) => post.toJSON(currentUser)), count];
  }
}
