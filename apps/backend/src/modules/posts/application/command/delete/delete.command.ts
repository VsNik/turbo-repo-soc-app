import { User } from 'src/modules/users/domain';

export class DeleteCommand {
  constructor(
    public postId: string,
    public currentUser: User,
  ) {}
}
