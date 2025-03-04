import { Type } from '@nestjs/common';
import { IEventHandler } from '@nestjs/cqrs';
import { PostCreatedEventHandler } from './posr-created.event-handler';
import { PostCommentedEventHandler } from './post-commented.event-handler';
import { PostLikedEventHandler } from './post-liked.event-handler';
import { UserFollowedEventHandler } from './user-folloved.event-handler';

export { PostCreatedEventHandler } from './posr-created.event-handler';
export { PostCommentedEventHandler } from './post-commented.event-handler';
export { PostLikedEventHandler } from './post-liked.event-handler';
export { UserFollowedEventHandler } from './user-folloved.event-handler';

export const EVENT_HANDLERS: Type<IEventHandler>[] = [
  PostCreatedEventHandler,
  PostCommentedEventHandler,
  PostLikedEventHandler,
  UserFollowedEventHandler,
];
