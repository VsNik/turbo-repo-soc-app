import { Type } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { DeleteCommandHandler } from './delete/delete.command-handler';

export * from './delete/delete.command';

export * from './delete/delete.command-handler';

export const COMMAND_HANDLERS: Type<ICommandHandler>[] = [DeleteCommandHandler];
