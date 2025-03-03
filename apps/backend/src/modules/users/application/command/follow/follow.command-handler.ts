import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { FollowCommand } from './follow.command';
import { IUser } from 'src/modules/users/infrastructure';
import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import {
  IUsersRepository,
  UserFollowedEvent,
  USERS_REPO,
} from 'src/modules/users/domain';

@CommandHandler(FollowCommand)
export class FollowCommandHandler
  implements ICommandHandler<FollowCommand, IUser>
{
  constructor(
    @Inject(USERS_REPO) private readonly usersRepo: IUsersRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute({ followId, currentId }: FollowCommand): Promise<IUser> {
    if (followId === currentId) {
      throw new BadRequestException('No self following.');
    }

    const followUser = await this.usersRepo.findById(followId);
    if (!followUser) {
      throw new NotFoundException('User not found.');
    }

    const currentUser = await this.usersRepo.findById(currentId, ['followers']);

    if (!currentUser.followers.contains(followUser)) {
      currentUser.followers.add(followUser);
      currentUser.incrimentFollowers();
      followUser.incrimentFollowing();
      this.eventBus.publish(new UserFollowedEvent(currentId, followUser));
    } else {
      currentUser.followers.remove(followUser);
      currentUser.decrimentFollowers();
      followUser.decrimentFollowing();
    }

    await this.usersRepo.flush();

    return currentUser.toJSON(currentUser);
  }
}
