import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteCommand } from './delete.command';
import { BadRequestException, Inject } from '@nestjs/common';
import {
  INotifyRepository,
  NOTIFY_REPO,
} from 'src/modules/notifications/domain';

@CommandHandler(DeleteCommand)
export class DeleteCommandHandler
  implements ICommandHandler<DeleteCommand, { id: string }>
{
  constructor(
    @Inject(NOTIFY_REPO) private readonly notifyRepo: INotifyRepository,
  ) {}

  async execute({
    notifyId,
    currentId,
  }: DeleteCommand): Promise<{ id: string }> {
    const notify = await this.notifyRepo.findById(notifyId);

    if (notify.receiveId !== currentId) {
      throw new BadRequestException('Access denied.');
    }

    await this.notifyRepo.delete(notify);
    return { id: notify.id };
  }
}
