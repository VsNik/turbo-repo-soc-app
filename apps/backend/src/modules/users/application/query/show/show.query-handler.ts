import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ShowQuery } from './show.query';
import { Inject, NotFoundException } from '@nestjs/common';
import { IUsersRepository, USERS_REPO } from 'src/modules/users/domain';

@QueryHandler(ShowQuery)
export class ShowQueryHandler implements IQueryHandler<ShowQuery> {
  constructor(
    @Inject(USERS_REPO) private readonly usersRepo: IUsersRepository,
  ) {}

  async execute({ userId, currentId }: ShowQuery): Promise<any> {
    const user = await this.usersRepo.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const currentUser = await this.usersRepo.findById(currentId, ['followers']);

    return user.toJSON(currentUser);
  }
}
