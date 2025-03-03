import { PostsFilter } from 'src/modules/posts/infrastructure';
import { User } from 'src/modules/users/domain';

export class UserPostsQuery {
  constructor(
    public userId: string,
    public filter: PostsFilter,
    public currentUser: User,
  ) {}
}
