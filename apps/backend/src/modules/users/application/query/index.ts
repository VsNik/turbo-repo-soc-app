import { Type } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { SearchQueryHandler } from './search/search.query-handler';
import { ShowQueryHandler } from './show/show.query-handler';
import { SuggestedQueryHandler } from './suggested/suggested.query-handler';
import { GetFollowersQueryHandler } from './get-followers/get-followers.query-handler';
import { GetFollowingsQueryHandler } from './get-followings/get-followings.query-handler';

export * from './search/search.query';
export * from './show/show.query';
export * from './suggested/suggested.query';
export * from './get-followers/get-followers.query';
export * from './get-followings/get-followings.query';

export * from './search/search.query-handler';
export * from './show/show.query-handler';
export * from './suggested/suggested.query-handler';
export * from './get-followers/get-followers.query-handler';
export * from './get-followings/get-followings.query-handler';

export const QUERY_HANDLERS: Type<IQueryHandler>[] = [
  SearchQueryHandler,
  ShowQueryHandler,
  SuggestedQueryHandler,
  GetFollowersQueryHandler,
  GetFollowingsQueryHandler,
];
