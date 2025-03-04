import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PostLikedEvent } from 'src/modules/posts/domain';

@EventsHandler(PostLikedEvent)
export class PostLikedEventHandler implements IEventHandler<PostLikedEvent> {
  constructor() {}

  async handle({ postId, userId }: PostLikedEvent) {
    console.log({ postId, userId });
  }
}
