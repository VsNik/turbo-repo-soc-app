import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PostCommentedEvent } from 'src/modules/comments/domain/events';

@EventsHandler(PostCommentedEvent)
export class PostCommentedEventHandler
  implements IEventHandler<PostCommentedEvent>
{
  constructor() {}

  async handle({ postId, comment }: PostCommentedEvent) {
    console.log({ postId, comment });
  }
}
