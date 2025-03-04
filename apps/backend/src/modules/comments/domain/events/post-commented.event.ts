import { Comment } from '../comment.entity';

export class PostCommentedEvent {
  constructor(
    public postId: string,
    public comment: Comment,
  ) {}
}
