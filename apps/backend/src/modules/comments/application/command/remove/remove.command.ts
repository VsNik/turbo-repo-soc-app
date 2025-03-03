import { User } from 'src/modules/users/domain';

export class RemoveCommand {
  constructor(
    public commentId: string,
    public currentUser: User,
  ) {}
}
