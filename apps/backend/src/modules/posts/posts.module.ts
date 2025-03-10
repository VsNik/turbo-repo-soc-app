import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { POSTS_REPO } from './domain';
import { FILE_UPLOADER } from 'src/common/types';
import { FsUploader } from 'src/common/utils';
import { COMMAND_HANDLERS, QUERY_HANDLERS } from './application';
import { PostsController } from './posts.condroller';
import { USERS_REPO } from '../users/domain';
import { UsersRepository } from '../users/infrastructure';
import { PostsRepository } from './infrastructure';

@Module({
  imports: [CqrsModule],
  providers: [
    ...COMMAND_HANDLERS,
    ...QUERY_HANDLERS,
    {
      provide: POSTS_REPO,
      useClass: PostsRepository,
    },
    {
      provide: USERS_REPO,
      useClass: UsersRepository,
    },
    {
      provide: FILE_UPLOADER,
      useClass: FsUploader,
    },
  ],
  controllers: [PostsController],
})
export class PostsModule {}
