import { Type } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { ByPostQueryHandler } from './by-post/by-post.query-handler';

export * from './by-post/by-post.query';

export * from './by-post/by-post.query-handler';

export const QUERY_HANDLERS: Type<IQueryHandler>[] = [ByPostQueryHandler];
