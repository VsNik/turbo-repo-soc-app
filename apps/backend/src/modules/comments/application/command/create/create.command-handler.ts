import { Inject } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateCommand } from './create.command';
import {
  Comment,
  COMMENTS_REPO,
  ICommentsRepository,
} from 'src/modules/comments/domain';
import { IPostsRepository, POSTS_REPO } from 'src/modules/posts/domain';
import { PostCommentedEvent } from 'src/modules/comments/domain/events';

@CommandHandler(CreateCommand)
export class CreateCommandHandler implements ICommandHandler<CreateCommand> {
  constructor(
    @Inject(COMMENTS_REPO) private readonly commentsRepo: ICommentsRepository,
    @Inject(POSTS_REPO) private readonly postsRepo: IPostsRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute({ postId, content, currentUser }: CreateCommand): Promise<any> {
    const post = await this.postsRepo.findOne(postId);
    const connentEntity = new Comment(currentUser, post, content);
    post.incrimentPostCount();
    const comment = await this.commentsRepo.create(connentEntity);
    this.eventBus.publish(new PostCommentedEvent(post, currentUser));

    return comment.toJSON(currentUser);
  }
}
