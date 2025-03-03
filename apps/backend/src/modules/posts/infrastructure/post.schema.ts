import { Cascade, EntitySchema } from '@mikro-orm/core';
import { Post } from '../domain/post.entity';
import { User } from '../../../modules/users/domain';
import { PostType } from '../../../common/types';

export const postSchema = new EntitySchema<Post>({
  class: Post,
  tableName: 'posts',
  properties: {
    id: { type: 'uuid', primary: true },
    caption: { type: 'string', default: '' },
    media: { type: 'string' },
    author: { kind: 'm:1', entity: () => User, eager: true },
    likeCount: { type: 'number', default: 0 },
    commentCount: { type: 'number', default: 0 },
    favoriteCount: { type: 'number', default: 0 },
    postType: { enum: true, items: () => PostType, default: PostType.Image },
    likes: {
      kind: 'm:n',
      entity: () => User,
      hidden: true,
      // eager: true,
      cascade: [Cascade.ALL],
    },
    createdAt: { type: 'string' },
  },
});
