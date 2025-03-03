import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { NotificationsModule } from './notifications/notifications.module';
import { WebSocketModule } from './web-socket/web-socket.module';
import { MessangerModule } from './messanger/messanger.module';

@Module({
  imports: [
    WebSocketModule,
    UsersModule,
    PostsModule,
    CommentsModule,
    NotificationsModule,
    MessangerModule,
  ],
})
export class ModulesModule {}
