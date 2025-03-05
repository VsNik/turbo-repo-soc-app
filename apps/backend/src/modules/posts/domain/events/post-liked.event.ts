import { User } from 'src/modules/users/domain';
import { Post } from '../post.entity';

export class PostLikedEvent {
  constructor(
    public post: Post,
    public user: User,
  ) {}
}
