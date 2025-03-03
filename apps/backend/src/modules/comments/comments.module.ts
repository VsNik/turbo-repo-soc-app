import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { COMMAND_HANDLERS, QUERY_HANDLERS } from './application';
import { COMMENTS_REPO } from './domain';
import { CommentsRepository } from './infrastructure';
import { POSTS_REPO } from '../posts/domain';
import { PostsRepository } from '../posts/infrastructure';
import { CommentsController } from './comments.controller';

@Module({
  imports: [CqrsModule],
  providers: [
    ...COMMAND_HANDLERS,
    ...QUERY_HANDLERS,
    {
      provide: COMMENTS_REPO,
      useClass: CommentsRepository,
    },
    {
      provide: POSTS_REPO,
      useClass: PostsRepository,
    },
  ],
  controllers: [CommentsController],
})
export class CommentsModule {}
