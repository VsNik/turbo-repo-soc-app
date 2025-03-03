import { Collection, wrap } from '@mikro-orm/core';
import { randomUUID } from 'crypto';
import { PostType } from 'src/common/types';
import { User } from 'src/modules/users/domain';
import { IPost } from '../infrastructure/types';

export class Post {
  id: string;
  media: string;
  caption: string;
  author: User;
  likeCount: number;
  commentCount: number;
  favoriteCount: number;
  postType: PostType;
  likes = new Collection<User>(this);
  createdAt: string;

  constructor(
    author: User,
    media: string,
    postType: PostType,
    caption?: string,
  ) {
    this.id = randomUUID();
    this.author = author;
    this.media = media;
    this.caption = caption;
    this.postType = postType;
    this.createdAt = new Date().toISOString();
  }

  isAuthor(userId: string): boolean {
    return this.author.id === userId;
  }

  incrimentPostCount() {
    this.commentCount++;
  }

  decrimentPostCount() {
    this.commentCount--;
  }

  addLike(user: User) {
    this.likes.add(user);
    this.likeCount++;
  }

  removeLike(user: User) {
    this.likes.remove(user);
    this.likeCount--;
  }

  isLiked(user: User) {
    return this.likes.contains(user);
  }

  toJSON(user?: User): IPost {
    const entity = wrap<Post>(this).toObject() as IPost;
    entity.isLiked = false;
    entity.isFavorite = false;
    entity.author = this.author.toJSON(user);
    return entity;
  }
}
