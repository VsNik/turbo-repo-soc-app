import { Type } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { GetByUserQueryHandler } from './get-gy-user/get-gy-user.query-handler';

export * from './get-gy-user/get-gy-user.query';

export * from './get-gy-user/get-gy-user.query-handler';

export const QUERY_HANDLERS: Type<IQueryHandler>[] = [GetByUserQueryHandler];
