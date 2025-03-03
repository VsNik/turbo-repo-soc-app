import { Collection, wrap } from '@mikro-orm/core';
import { randomUUID } from 'crypto';
import { Post } from 'src/modules/posts/domain';
import { User } from 'src/modules/users/domain';

export class Comment {
  id: string;
  content: string;
  post: Post;
  author: User;
  likeCount: number;
  likes = new Collection<User>(this);
  createdAt: string;

  constructor(author: User, post: Post, content: string) {
    this.id = randomUUID();
    this.author = author;
    this.post = post;
    this.content = content;
    this.createdAt = new Date().toISOString();
  }

  like(user: User): Comment {
    if (this.isLiked) {
      this.likes.remove(user);
      this.likeCount--;
    } else {
      this.likes.add(user);
      this.likeCount++;
    }
    return this;
  }

  isLiked(user: User) {
    return this.likes.contains(user);
  }

  toJSON(user?: User) {
    const entity = wrap<Comment>(this).toObject();
    entity.author = this.author.toJSON(user);
    return entity;
  }
}
