import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AllQuery } from './all.query';
import { IPostsRepository, POSTS_REPO } from '../../../domain';
import { Inject } from '@nestjs/common';
import { IPost } from '../../../infrastructure';

@QueryHandler(AllQuery)
export class AllQueryHandler
  implements IQueryHandler<AllQuery, [IPost[], number]>
{
  constructor(
    @Inject(POSTS_REPO)
    private readonly postsRepo: IPostsRepository,
  ) {}

  async execute({ filter, currentUser }: AllQuery): Promise<[IPost[], number]> {
    const [data, count] = await this.postsRepo.findAll(filter);
    return [data.map((post) => post.toJSON(currentUser)), count];
  }
}
