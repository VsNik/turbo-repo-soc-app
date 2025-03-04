import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PostCreatedEvent } from 'src/modules/posts/domain';

@EventsHandler(PostCreatedEvent)
export class PostCreatedEventHandler
  implements IEventHandler<PostCreatedEvent>
{
  constructor() {}

  async handle({ postId, userId }: PostCreatedEvent) {
    console.log({ postId, userId });
  }
}
