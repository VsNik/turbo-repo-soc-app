import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../domain';

@Injectable()
export class AuthTokenService {
  constructor(private readonly jwt: JwtService) {}

  create(user: User) {
    const payload = { id: user.id };
    return {
      access_token: this.jwt.sign(payload),
    };
  }
}
