import { hash } from 'argon2';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCommand } from './create.command';
import { Inject, UnprocessableEntityException } from '@nestjs/common';
import { IUsersRepository, User, USERS_REPO } from 'src/modules/users/domain';
import { IUser } from 'src/modules/users/infrastructure';
import { AuthTokenService } from '../../services';

@CommandHandler(CreateCommand)
export class CreateCommandHandler
  implements ICommandHandler<CreateCommand, IUser>
{
  constructor(
    @Inject(USERS_REPO)
    private readonly usersRepo: IUsersRepository,
    private readonly authToken: AuthTokenService,
  ) {}

  async execute({ username, email, password }: CreateCommand): Promise<any> {
    const existUserByEmail = await this.usersRepo.findByUsername(email);
    if (existUserByEmail) {
      throw new UnprocessableEntityException(
        'User with Email address is already exist.',
      );
    }

    const existUserByUserName = await this.usersRepo.findByUsername(username);
    if (existUserByUserName) {
      throw new UnprocessableEntityException(
        'User with UserName is already exist.',
      );
    }

    const passwordHash = await hash(password);

    const userEntity = new User({
      username,
      email,
      password: passwordHash,
    });

    const newUser = await this.usersRepo.create(userEntity);

    return {
      user: newUser.toJSON(),
      ...this.authToken.create(newUser),
    };
  }
}
