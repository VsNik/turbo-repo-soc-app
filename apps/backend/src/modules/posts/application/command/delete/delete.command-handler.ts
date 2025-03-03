import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteCommand } from './delete.command';
import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { FILE_UPLOADER, IUploader } from 'src/common/types';
import { IPostsRepository, POSTS_REPO } from 'src/modules/posts/domain';

@CommandHandler(DeleteCommand)
export class DeleteCommandHandler
  implements ICommandHandler<DeleteCommand, { id: string }>
{
  constructor(
    @Inject(POSTS_REPO) private readonly postsRepo: IPostsRepository,
    @Inject(FILE_UPLOADER) private readonly uploader: IUploader,
  ) {}

  async execute({
    postId,
    currentUser,
  }: DeleteCommand): Promise<{ id: string }> {
    const post = await this.postsRepo.findOne(postId);
    if (!post) {
      throw new NotFoundException('Post npt found');
    }

    if (!post.isAuthor(currentUser.id)) {
      throw new BadRequestException('You is not author this post.');
    }

    currentUser.decrimentPostsCount();
    await this.postsRepo.remove(post);
    await this.uploader.deleteFile(post.media);

    return { id: post.id };
  }
}
