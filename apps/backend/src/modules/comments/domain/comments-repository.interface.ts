import { Pagination } from '../infrastructure';
import { Comment } from './comment.entity';

export const COMMENTS_REPO = Symbol('COMMENTS_REPO');

export interface ICommentsRepository {
  create(entity: Comment): Promise<Comment>;
  findById(id: string): Promise<Comment | null>;
  findForPost(id: string, pagination: Pagination): Promise<Comment[]>;
  remove(entity: Comment): Promise<void>;
  flush(): Promise<void>;
}
