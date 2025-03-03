import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginCommand } from './login.command';
import { Inject, UnprocessableEntityException } from '@nestjs/common';
import { IUsersRepository, USERS_REPO } from 'src/modules/users/domain';
import { AuthTokenService } from '../../services';
import { verify } from 'argon2';

@CommandHandler(LoginCommand)
export class LoginCommandHandler implements ICommandHandler<LoginCommand> {
  constructor(
    @Inject(USERS_REPO)
    private readonly usersRepo: IUsersRepository,
    private readonly authToken: AuthTokenService,
  ) {}

  async execute({ email, password }: LoginCommand): Promise<any> {
    const existUser = await this.usersRepo.findByEmail(email);
    if (!existUser) {
      throw new UnprocessableEntityException('Invalid credentials.');
    }

    const isValidPassword = verify(existUser.password, password);
    if (!isValidPassword) {
      throw new UnprocessableEntityException('Invalid credentials.');
    }

    return {
      user: existUser.toJSON(),
      ...this.authToken.create(existUser),
    };
  }
}
