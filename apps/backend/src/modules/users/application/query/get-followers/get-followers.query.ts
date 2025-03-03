export class GetFollowersQuery {
  constructor(
    public userId: string,
    public currentId: string,
  ) {}
}
