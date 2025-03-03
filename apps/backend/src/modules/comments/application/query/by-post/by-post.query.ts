import { Pagination } from 'src/modules/comments/infrastructure';
import { User } from 'src/modules/users/domain';

export class ByPostQuery {
  constructor(
    public postId: string,
    public pagination: Pagination,
    public currentUser: User,
  ) {}
}
