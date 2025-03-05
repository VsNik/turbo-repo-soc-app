import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateCommand } from './create.commsnd';
import { IPost } from 'src/modules/posts/infrastructure';
import { BadRequestException, Inject } from '@nestjs/common';
import {
  IPostsRepository,
  Post,
  PostCreatedEvent,
  POSTS_REPO,
} from 'src/modules/posts/domain';
import {
  FILE_UPLOADER,
  FileType,
  IUploader,
  PostType,
  UploadType,
} from 'src/common/types';
import { detectFileType } from 'src/common/utils';
import { IUsersRepository } from 'src/modules/users/domain';

@CommandHandler(CreateCommand)
export class CreateCommandHandler
  implements ICommandHandler<CreateCommand, IPost>
{
  constructor(
    @Inject(POSTS_REPO) private readonly postsRepo: IPostsRepository,
    @Inject(POSTS_REPO) private readonly usersRepo: IUsersRepository,
    @Inject(FILE_UPLOADER) private readonly uploader: IUploader,
    private readonly eventBus: EventBus,
  ) {}

  async execute({ currentId, file, caption }: CreateCommand): Promise<IPost> {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    const currentUser = await this.usersRepo.findById(currentId, ['following']);
    const media = await this.uploader.uploadFile(file, UploadType.Post);

    const postType =
      detectFileType(file) === FileType.Image ? PostType.Image : PostType.Video;

    const postEntity = new Post(currentUser, media, postType, caption);
    const newPost = await this.postsRepo.create(postEntity);
    currentUser.incrimentPostsCount();

    await this.postsRepo.flush();

    const recipientIDs = currentUser.following.getIdentifiers('id');
    this.eventBus.publish(
      new PostCreatedEvent(newPost, currentUser, recipientIDs),
    );

    return newPost.toJSON(currentUser);
  }
}
