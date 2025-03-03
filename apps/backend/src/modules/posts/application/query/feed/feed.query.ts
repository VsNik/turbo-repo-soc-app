import { PostsFilter } from 'src/modules/posts/infrastructure';
import { User } from 'src/modules/users/domain';

export class FeedQuery {
  constructor(
    public filter: PostsFilter,
    public currentUser: User,
  ) {}
}
