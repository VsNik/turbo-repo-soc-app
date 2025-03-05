import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetByUserQuery } from './get-gy-user.query';
import { Inject } from '@nestjs/common';
import {
  INotifyRepository,
  NOTIFY_REPO,
} from 'src/modules/notifications/domain';

@QueryHandler(GetByUserQuery)
export class GetByUserQueryHandler implements IQueryHandler<GetByUserQuery> {
  constructor(
    @Inject(NOTIFY_REPO) private readonly notifyRepo: INotifyRepository,
  ) {}

  async execute({ currentId }: GetByUserQuery): Promise<any> {
    const notifications = await this.notifyRepo.getByUserId(currentId);
    return notifications.map((notify) => notify.formatNotify());
  }
}
