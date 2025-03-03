import { Cascade, EntitySchema } from '@mikro-orm/core';
import { Comment } from '../domain';

export const commentSchema = new EntitySchema<Comment>({
  class: Comment,
  tableName: 'comments',
  properties: {
    id: { type: 'uuid', primary: true },
    content: { type: 'string' },
    post: { kind: 'm:1', entity: 'Post' },
    author: { kind: 'm:1', entity: 'User', eager: true },
    likeCount: { type: 'number', default: 0 },
    likes: {
      kind: 'm:n',
      entity: 'User',
      hidden: true,
      cascade: [Cascade.ALL],
    },
    createdAt: { type: 'string' },
  },
});
