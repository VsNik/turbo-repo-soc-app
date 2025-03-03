import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/modules/users/domain';

export const CurrentUser = createParamDecorator(
  (data: keyof User, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return data ? request.user[data] : request.user;
  },
);
