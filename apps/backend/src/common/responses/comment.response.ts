import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { User } from 'src/modules/users/domain';
import { UserResponse } from './user.response';

export class CommentResponse {
  @ApiProperty({ example: '8779747f-8874-44b1-864b-aa60e9f8d593' })
  @Expose()
  id: string;

  @ApiProperty({ example: 'Bla bla bla' })
  @Expose()
  content: string;

  @ApiProperty({ type: UserResponse })
  @Type(() => UserResponse)
  @Expose()
  author: User;

  @ApiProperty({ example: '2024-08-13 16:21:33.049+00' })
  @Expose()
  createdAt: string;
}
