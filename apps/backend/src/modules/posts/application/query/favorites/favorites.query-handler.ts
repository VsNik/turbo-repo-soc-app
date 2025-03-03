import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FavoritesQuery } from './favorites.query';
import { IPost } from 'src/modules/posts/infrastructure';
import { Inject } from '@nestjs/common';
import { IPostsRepository, POSTS_REPO } from 'src/modules/posts/domain';
import { IUsersRepository, USERS_REPO } from 'src/modules/users/domain';

@QueryHandler(FavoritesQuery)
export class FavoritesQueryHandler
  implements IQueryHandler<FavoritesQuery, [IPost[], number]>
{
  constructor(
    @Inject(POSTS_REPO)
    private readonly postsRepo: IPostsRepository,
    @Inject(USERS_REPO)
    private readonly usersRepo: IUsersRepository,
  ) {}

  async execute({
    filter,
    currentId,
  }: FavoritesQuery): Promise<[IPost[], number]> {
    const currentUser = await this.usersRepo.findById(currentId, [
      'followers',
      'favorites',
    ]);
    const favoriteIDs = currentUser.favorites.getIdentifiers('id');

    const [data, count] = await this.postsRepo.findByIDs(filter, favoriteIDs);

    return [data.map((post) => post.toJSON(currentUser)), count];
  }
}
