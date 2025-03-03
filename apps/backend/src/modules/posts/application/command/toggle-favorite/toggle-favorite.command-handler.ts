import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ToggleFavoriteCommand } from './toggle-favorite.command';
import { IPost } from 'src/modules/posts/infrastructure';
import { Inject, NotFoundException } from '@nestjs/common';
import { IPostsRepository, POSTS_REPO } from 'src/modules/posts/domain';
import { IUsersRepository, USERS_REPO } from 'src/modules/users/domain';

const POST_NOT_FOUND = 'Post not found.';

@CommandHandler(ToggleFavoriteCommand)
export class ToggleFavoriteCommandHandler
  implements ICommandHandler<ToggleFavoriteCommand, IPost>
{
  constructor(
    @Inject(POSTS_REPO) private readonly postsRepo: IPostsRepository,
    @Inject(USERS_REPO) private readonly usersRepo: IUsersRepository,
  ) {}

  async execute({ postId, currentId }: ToggleFavoriteCommand): Promise<IPost> {
    const post = await this.postsRepo.findOne(postId);
    if (!post) {
      throw new NotFoundException(POST_NOT_FOUND);
    }

    const currentUser = await this.usersRepo.findById(currentId, [
      'followers',
      'favorites',
    ]);
    currentUser.toggleFavorite(post);
    this.postsRepo.flush();
    return post.toJSON(currentUser);
  }
}
