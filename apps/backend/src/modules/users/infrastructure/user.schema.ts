import { Cascade, EntitySchema } from '@mikro-orm/core';
import { User } from '../domain';
import { Post } from '../../../modules/posts/domain';

export const userSchema = new EntitySchema<User>({
  class: User,
  tableName: 'users',
  properties: {
    id: { type: 'uuid', primary: true },
    username: { type: 'string', unique: true },
    displayName: { type: 'string' },
    email: { type: 'string', unique: true },
    password: { type: 'string', hidden: true },
    avatar: { type: 'string', nullable: true, default: null },
    postCount: { type: 'number', default: 0 },
    followersCount: { type: 'number', default: 0 },
    followingCount: { type: 'number', default: 0 },
    followers: {
      kind: 'm:n',
      entity: () => User,
      inversedBy: (user) => user.following,
      owner: true,
      pivotTable: 'users_followers',
      joinColumn: 'follower',
      inverseJoinColumn: 'following',
      hidden: true,
    },
    following: {
      kind: 'm:n',
      entity: () => User,
      mappedBy: (user) => user.followers,
      hidden: true,
    },
    favorites: {
      kind: 'm:n',
      entity: () => Post,
      cascade: [Cascade.ALL],
      hidden: true,
    },
    createdAt: { type: 'string' },
  },
});
