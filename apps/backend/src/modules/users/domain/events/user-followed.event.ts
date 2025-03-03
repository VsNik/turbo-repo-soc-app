import { User } from '../user.entity';

export class UserFollowedEvent {
  constructor(
    public readonly userId: string,
    public readonly followUser: User,
  ) {}
}
