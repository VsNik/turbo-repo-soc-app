import { LoginDto } from 'src/modules/users/infrastructure';

export class LoginCommand {
  email: string;
  password: string;

  constructor(dto: LoginDto) {
    this.email = dto.email;
    this.password = dto.password;
  }
}
