import { PostType } from "./common";

export type Auth = {
  user: User;
  token: string;
};

export type User = {
  id: string;
  username: string;
  displayName: string;
  email: string;
  avatar: string;
  postCount: number;
  followersCount: number;
  followingCount: number;
  createdAt: string;
  isFollow: boolean;
};

export type Post = {
  id: string;
  media: string;
  caption: string;
  author: User;
  likeCount: number;
  favoriteCount: number;
  postType: PostType;
  createdAt: string;
};

export type Comment = {
  id: string;
  content: string;
  postId: string;
  author: User;
  likeCount: number;
  isLiked: boolean;
  createdAt: string;
};
