import { Expose, Type } from 'class-transformer';
import { UserResponse } from './user.response';
import { ApiProperty } from '@nestjs/swagger';

export class AuthResponse {
  @Type(() => UserResponse)
  @ApiProperty({ type: UserResponse })
  @Expose()
  user: UserResponse[];

  @ApiProperty()
  @Expose()
  access_token: string;
}
