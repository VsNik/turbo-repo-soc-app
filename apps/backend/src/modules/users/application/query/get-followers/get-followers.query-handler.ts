import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetFollowersQuery } from './get-followers.query';
import { IUser } from 'src/modules/users/infrastructure';
import { IUsersRepository, USERS_REPO } from 'src/modules/users/domain';

@QueryHandler(GetFollowersQuery)
export class GetFollowersQueryHandler
  implements IQueryHandler<GetFollowersQuery, IUser[]>
{
  constructor(
    @Inject(USERS_REPO)
    private readonly usersRepo: IUsersRepository,
  ) {}

  async execute({ userId, currentId }: GetFollowersQuery): Promise<IUser[]> {
    const currentUser = await this.usersRepo.findById(currentId);
    const user = await this.usersRepo.findById(userId, ['followers']);
    const followers = user.followers;

    return followers.map((item) => item.toJSON(currentUser));
  }
}
