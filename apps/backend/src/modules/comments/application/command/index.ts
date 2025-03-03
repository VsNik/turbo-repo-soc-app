import { Type } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { CreateCommandHandler } from './create/create.command-handler';
import { RemoveCommandHandler } from './remove/remove.command-handler';
import { ToggleLikeCommandHandler } from './toggle-like/toggle-like.command-handler';

export * from './create/create.command';
export * from './remove/remove.command';
export * from './toggle-like/toggle-like.command';

export * from './create/create.command-handler';
export * from './remove/remove.command-handler';
export * from './toggle-like/toggle-like.command-handler';

export const COMMAND_HANDLERS: Type<ICommandHandler>[] = [
  CreateCommandHandler,
  RemoveCommandHandler,
  ToggleLikeCommandHandler,
];
