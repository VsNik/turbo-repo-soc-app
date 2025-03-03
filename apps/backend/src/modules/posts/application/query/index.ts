import { Type } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { AllQueryHandler } from './all/all.query-handler';
import { FeedQueryHandler } from './feed/feed.query-handler';
import { FavoritesQueryHandler } from './favorites/favorites.query-handler';
import { ShowQueryHandler } from './show/show.query-handler';
import { UserPostsQueryHandler } from './user-posts/user-posts.query-handler';

export * from './all/all.query';
export * from './feed/feed.query';
export * from './favorites/favorites.query';
export * from './show/show.query';
export * from './user-posts/user-posts.query';

export * from './all/all.query-handler';
export * from './feed/feed.query-handler';
export * from './favorites/favorites.query-handler';
export * from './show/show.query-handler';
export * from './user-posts/user-posts.query-handler';

export const QUERY_HANDLERS: Type<IQueryHandler>[] = [
  AllQueryHandler,
  FeedQueryHandler,
  FavoritesQueryHandler,
  ShowQueryHandler,
  UserPostsQueryHandler,
];
