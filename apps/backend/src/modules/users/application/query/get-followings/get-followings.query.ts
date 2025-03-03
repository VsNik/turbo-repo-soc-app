export class GetFollowingsQuery {
  constructor(
    public userId: string,
    public currentId: string,
  ) {}
}
