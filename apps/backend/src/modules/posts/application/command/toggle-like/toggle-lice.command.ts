import { User } from 'src/modules/users/domain';

export class ToggleLikeCommand {
  constructor(
    public postId: string,
    public currentUser: User,
  ) {}
}
