import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RemoveCommand } from './remove.command';
import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import {
  COMMENTS_REPO,
  ICommentsRepository,
} from 'src/modules/comments/domain';
import { IPostsRepository, POSTS_REPO } from 'src/modules/posts/domain';

const COMMENT_NOT_FOUND = 'Comment not found.';
const NO_COMMENT_AUTHOR = 'You is not author this comment.';

@CommandHandler(RemoveCommand)
export class RemoveCommandHandler
  implements ICommandHandler<RemoveCommand, { id: string }>
{
  constructor(
    @Inject(COMMENTS_REPO) private readonly commentsRepo: ICommentsRepository,
    @Inject(POSTS_REPO) private readonly postsRepo: IPostsRepository,
  ) {}

  async execute({
    commentId,
    currentUser,
  }: RemoveCommand): Promise<{ id: string }> {
    const comment = await this.commentsRepo.findById(commentId);
    if (!comment) {
      throw new NotFoundException(COMMENT_NOT_FOUND);
    }

    if (comment.author.id !== currentUser.id) {
      throw new BadRequestException(NO_COMMENT_AUTHOR);
    }

    const post = await this.postsRepo.findOne(comment.post.id);

    post.decrimentPostCount();
    await this.commentsRepo.remove(comment);

    return { id: comment.id };
  }
}
