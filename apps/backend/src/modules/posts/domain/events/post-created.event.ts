import { User } from 'src/modules/users/domain';
import { Post } from '../post.entity';

export class PostCreatedEvent {
  constructor(
    public post: Post,
    public user: User,
    public recipientIDs: string[],
  ) {}
}
