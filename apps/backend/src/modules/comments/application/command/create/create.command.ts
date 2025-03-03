import { User } from 'src/modules/users/domain';

export class CreateCommand {
  constructor(
    public postId: string,
    public content: string,
    public currentUser: User,
  ) {}
}
