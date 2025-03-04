import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserFollowedEvent } from 'src/modules/users/domain';

@EventsHandler(UserFollowedEvent)
export class UserFollowedEventHandler
  implements IEventHandler<UserFollowedEvent>
{
  constructor() {}

  async handle({ userId, followUser }: UserFollowedEvent) {
    console.log({ userId, followUser });
  }
}
