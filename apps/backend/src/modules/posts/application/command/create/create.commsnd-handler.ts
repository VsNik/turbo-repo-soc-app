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

@CommandHandler(CreateCommand)
export class CreateCommandHandler
  implements ICommandHandler<CreateCommand, IPost>
{
  constructor(
    @Inject(POSTS_REPO) private readonly postsRepo: IPostsRepository,
    @Inject(FILE_UPLOADER) private readonly uploader: IUploader,
    private readonly eventBus: EventBus,
  ) {}

  async execute({ currentUser, file, caption }: CreateCommand): Promise<IPost> {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    const media = await this.uploader.uploadFile(file, UploadType.Post);

    const postType =
      detectFileType(file) === FileType.Image ? PostType.Image : PostType.Video;

    const postEntity = new Post(currentUser, media, postType, caption);
    const newPost = await this.postsRepo.create(postEntity);
    currentUser.incrimentPostsCount();

    await this.postsRepo.flush();

    this.eventBus.publish(new PostCreatedEvent(newPost.id, currentUser.id));

    return newPost.toJSON(currentUser);
  }
}
