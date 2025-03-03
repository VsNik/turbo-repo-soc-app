import { PostsFilter } from 'src/modules/posts/infrastructure';

export class FavoritesQuery {
  constructor(
    public filter: PostsFilter,
    public currentId: string,
  ) {}
}
