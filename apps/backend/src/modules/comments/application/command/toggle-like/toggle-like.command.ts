import { User } from 'src/modules/users/domain';

export class ToggleLikeCommand {
  constructor(
    public commentId: string,
    public currentUser: User,
  ) {}
}
