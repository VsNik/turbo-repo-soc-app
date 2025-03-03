export class PostLikedEvent {
  constructor(
    public postId: string,
    public userId: string,
  ) {}
}
