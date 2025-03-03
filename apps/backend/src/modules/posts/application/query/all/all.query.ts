import { User } from 'src/modules/users/domain';
import { PostsFilter } from '../../../infrastructure';

export class AllQuery {
  constructor(
    public filter: PostsFilter,
    public currentUser: User,
  ) {}
}
