import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCommand } from './update.command';
import { IUser } from 'src/modules/users/infrastructure';
import { Inject } from '@nestjs/common';
import { IUsersRepository, USERS_REPO } from 'src/modules/users/domain';
import { FILE_UPLOADER, IUploader, UploadType } from 'src/common/types';

@CommandHandler(UpdateCommand)
export class UpdateCommandHandler
  implements ICommandHandler<UpdateCommand, IUser>
{
  constructor(
    @Inject(USERS_REPO) private readonly usersRepo: IUsersRepository,
    @Inject(FILE_UPLOADER) private readonly uploader: IUploader,
  ) {}

  async execute({
    displayName,
    currentId,
    file,
  }: UpdateCommand): Promise<IUser> {
    const currentUser = await this.usersRepo.findById(currentId);

    if (displayName) {
      currentUser.setDisplayName(displayName);
    }

    if (file) {
      if (currentUser.avatar) {
        await this.uploader.deleteFile(currentUser.avatar);
      }
      currentUser.setAvatar(
        await this.uploader.uploadFile(file, UploadType.Avatar),
      );
    }

    await this.usersRepo.flush();
    return currentUser.toJSON();
  }
}
