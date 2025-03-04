import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteCommand } from './delete.command';

@CommandHandler(DeleteCommand)
export class DeleteCommandHandler
  implements ICommandHandler<DeleteCommand, { id: string }>
{
  constructor() {}

  async execute({}: DeleteCommand): Promise<{ id: string }> {
    return;
  }
}
