import { User } from 'src/modules/users/domain';

export class ShowQuery {
  constructor(
    public postId: string,
    public currentUser: User,
  ) {}
}
