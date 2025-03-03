import { EntityDTO } from '@mikro-orm/core';
import { Post } from '../domain/post.entity';

export interface IPost extends EntityDTO<Post> {
  isLiked?: boolean;
  isFavorite?: boolean;
}
