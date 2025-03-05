import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { ToggleLikeCommand } from './toggle-lice.command';
import { IPost } from 'src/modules/posts/infrastructure';
import {
  IPostsRepository,
  PostLikedEvent,
  POSTS_REPO,
} from 'src/modules/posts/domain';
import { Inject, NotFoundException } from '@nestjs/common';

const POST_NOT_FOUND = 'Post npt found.';

@CommandHandler(ToggleLikeCommand)
export class ToggleLikeCommandHandler
  implements ICommandHandler<ToggleLikeCommand, IPost>
{
  constructor(
    @Inject(POSTS_REPO) private readonly postsRepo: IPostsRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute({ postId, currentUser }: ToggleLikeCommand): Promise<IPost> {
    const post = await this.postsRepo.findOne(postId, ['likes']);
    if (!post) {
      throw new NotFoundException(POST_NOT_FOUND);
    }

    if (!post.isLiked(currentUser)) {
      post.addLike(currentUser);
      this.eventBus.publish(new PostLikedEvent(post, currentUser));
    } else {
      post.removeLike(currentUser);
    }

    return post.toJSON(currentUser);
  }
}
