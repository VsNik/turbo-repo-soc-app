import { CreateDto } from 'src/modules/users/infrastructure';

export class CreateCommand {
  username: string;
  email: string;
  password: string;

  constructor(dto: CreateDto) {
    this.username = dto.username;
    this.email = dto.email;
    this.password = dto.password;
  }
}
