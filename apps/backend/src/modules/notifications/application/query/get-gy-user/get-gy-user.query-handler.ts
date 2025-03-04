import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetByUserQuery } from './get-gy-user.query';

@QueryHandler(GetByUserQuery)
export class GetByUserQueryHandler implements IQueryHandler<GetByUserQuery> {
  constructor() {}

  async execute({}: GetByUserQuery): Promise<any> {
    return;
  }
}
