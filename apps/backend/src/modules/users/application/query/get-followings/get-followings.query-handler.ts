import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IUsersRepository, USERS_REPO } from 'src/modules/users/domain';
import { GetFollowingsQuery } from './get-followings.query';
import { IUser } from 'src/modules/users/infrastructure';

@QueryHandler(GetFollowingsQuery)
export class GetFollowingsQueryHandler
  implements IQueryHandler<GetFollowingsQuery, IUser[]>
{
  constructor(
    @Inject(USERS_REPO)
    private readonly usersRepo: IUsersRepository,
  ) {}

  async execute({ userId, currentId }: GetFollowingsQuery): Promise<IUser[]> {
    const currentUser = await this.usersRepo.findById(currentId, ['followers']);
    const user = await this.usersRepo.findById(userId, ['following']);
    const followers = user.followers;

    return followers.map((item) => item.toJSON(currentUser));
  }
}
