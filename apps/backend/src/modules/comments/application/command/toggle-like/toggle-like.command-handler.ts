import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ToggleLikeCommand } from './toggle-like.command';
import { Inject, NotFoundException } from '@nestjs/common';
import {
  COMMENTS_REPO,
  ICommentsRepository,
} from 'src/modules/comments/domain';

const COMMENT_NOT_FOUND = 'Comment not found';

@CommandHandler(ToggleLikeCommand)
export class ToggleLikeCommandHandler
  implements ICommandHandler<ToggleLikeCommand>
{
  constructor(
    @Inject(COMMENTS_REPO) private readonly commentsRepo: ICommentsRepository,
  ) {}

  async execute({ commentId, currentUser }: ToggleLikeCommand): Promise<any> {
    const comment = await this.commentsRepo.findById(commentId);
    if (!comment) {
      throw new NotFoundException(COMMENT_NOT_FOUND);
    }

    comment.like(currentUser);

    return comment.toJSON(currentUser);
  }
}
