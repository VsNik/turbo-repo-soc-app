import { Post } from 'src/modules/posts/domain';
import { User } from 'src/modules/users/domain';

export class PostCommentedEvent {
  constructor(
    public post: Post,
    public user: User,
  ) {}
}
