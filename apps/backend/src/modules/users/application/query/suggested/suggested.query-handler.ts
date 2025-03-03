import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SuggestedQuery } from './suggested.query';
import { IUser } from 'src/modules/users/infrastructure';
import { Inject } from '@nestjs/common';
import { IUsersRepository, USERS_REPO } from 'src/modules/users/domain';

@QueryHandler(SuggestedQuery)
export class SuggestedQueryHandler
  implements IQueryHandler<SuggestedQuery, IUser[]>
{
  constructor(
    @Inject(USERS_REPO) private readonly usersRepo: IUsersRepository,
  ) {}

  async execute({ currentId }: SuggestedQuery): Promise<IUser[]> {
    const users = await this.usersRepo.getSuggested(currentId);
    const currentUser = await this.usersRepo.findById(currentId, ['followers']);

    return users.map((user) => user.toJSON(currentUser));
  }
}
