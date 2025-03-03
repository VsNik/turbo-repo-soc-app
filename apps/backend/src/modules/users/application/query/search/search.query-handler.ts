import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SearchQuery } from './search.query';
import { Inject } from '@nestjs/common';
import { IUsersRepository, USERS_REPO } from 'src/modules/users/domain';

@QueryHandler(SearchQuery)
export class SearchQueryHandler implements IQueryHandler<SearchQuery> {
  constructor(
    @Inject(USERS_REPO) private readonly usersRepo: IUsersRepository,
  ) {}

  async execute({ search, currentId }: SearchQuery): Promise<any> {
    const users = await this.usersRepo.search(search, currentId);
    const currentUser = await this.usersRepo.findById(currentId, ['followers']);

    return users.map((user) => user.toJSON(currentUser));
  }
}
