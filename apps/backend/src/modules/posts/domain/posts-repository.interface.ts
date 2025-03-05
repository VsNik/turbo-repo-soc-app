import { PostRelations, PostsFilter } from '../infrastructure';
import { Post } from './post.entity';

export const POSTS_REPO = Symbol('POSTS_REPO');

export interface IPostsRepository {
  create(post: Post): Promise<Post>;
  findAll(filters: PostsFilter, userIDs?: string[]): Promise<[Post[], number]>;
  findOne(id: string, relations?: PostRelations[]): Promise<Post | null>;
  findByIDs(filter: PostsFilter, postIDs: string[]): Promise<[Post[], number]>;
  remove(post: Post): Promise<void>;
  flush(): Promise<void>;
}
