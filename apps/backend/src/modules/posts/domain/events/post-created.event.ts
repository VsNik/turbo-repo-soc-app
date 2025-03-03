export class PostCreatedEvent {
  constructor(
    public postId: string,
    public userId: string,
  ) {}
}
