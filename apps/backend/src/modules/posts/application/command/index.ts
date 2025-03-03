import { Type } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { CreateCommandHandler } from './create/create.commsnd-handler';
import { DeleteCommandHandler } from './delete/delete.command-handler';
import { ToggleLikeCommandHandler } from './toggle-like/toggle-lice.command-handler';
import { ToggleFavoriteCommandHandler } from './toggle-favorite/toggle-favorite.command-handler';

export * from './create/create.commsnd';
export * from './delete/delete.command';
export * from './toggle-like/toggle-lice.command';
export * from './toggle-favorite/toggle-favorite.command';

export * from './create/create.commsnd-handler';
export * from './delete/delete.command-handler';
export * from './toggle-like/toggle-lice.command-handler';
export * from './toggle-favorite/toggle-favorite.command-handler';

export const COMMAND_HANDLERS: Type<ICommandHandler>[] = [
  CreateCommandHandler,
  DeleteCommandHandler,
  ToggleLikeCommandHandler,
  ToggleFavoriteCommandHandler,
];
