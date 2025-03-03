import { ICommandHandler } from '@nestjs/cqrs';
import { CreateCommandHandler } from './create/create.command-handler';
import { Type } from '@nestjs/common';
import { LoginCommandHandler } from './login/login.command-handler';
import { UpdateCommandHandler } from './update/update.command-handler';
import { FollowCommandHandler } from './follow/follow.command-handler';

export * from './create/create.command';
export * from './login/login.command';
export * from './update/update.command';
export * from './follow/follow.command';

export * from './create/create.command-handler';
export * from './login/login.command-handler';
export * from './update/update.command-handler';
export * from './follow/follow.command-handler';

export const COMMAND_HANDLERS: Type<ICommandHandler>[] = [
  CreateCommandHandler,
  LoginCommandHandler,
  UpdateCommandHandler,
  FollowCommandHandler,
];
