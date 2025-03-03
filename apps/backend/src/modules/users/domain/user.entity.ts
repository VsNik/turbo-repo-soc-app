import { Collection, wrap } from '@mikro-orm/core';
import { randomUUID } from 'crypto';
import { CreateDto, IUser } from '../infrastructure';
import { Post } from 'src/modules/posts/domain';

export class User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  email: string;
  password: string;
  postCount: number;
  followersCount: number;
  followingCount: number;
  followers = new Collection<User>(this);
  following = new Collection<User>(this);
  favorites = new Collection<Post>(this);
  createdAt: string;

  constructor(createDto: CreateDto) {
    this.id = randomUUID();
    this.username = createDto.username;
    this.displayName = createDto.username;
    this.email = createDto.email;
    this.password = createDto.password;
    this.createdAt = new Date().toISOString();
  }

  setAvatar(avatar: string) {
    this.avatar = avatar;
  }

  setDisplayName(displayName: string) {
    this.displayName = displayName;
  }

  incrimentPostsCount() {
    this.postCount++;
  }

  decrimentPostsCount() {
    this.postCount--;
  }

  incrimentFollowers() {
    this.followersCount++;
  }

  decrimentFollowers() {
    this.followersCount--;
  }

  incrimentFollowing() {
    this.followingCount++;
  }

  decrimentFollowing() {
    this.followingCount--;
  }

  toggleFavorite(post: Post): User {
    if (!this.favorites.contains(post)) {
      this.favorites.add(post);
      post.favoriteCount++;
      return this;
    }
    this.favorites.remove(post);
    post.favoriteCount--;
    return this;
  }

  toJSON(user?: User): IUser {
    const entity = wrap<User>(this).toObject() as IUser;
    entity.isFollow =
      user instanceof User && user.followers.isInitialized()
        ? user.followers.contains(this)
        : false;
    return entity;
  }
}
