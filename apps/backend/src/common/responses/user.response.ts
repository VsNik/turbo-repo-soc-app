import { Expose, Transform } from 'class-transformer';
import { setFileUrl } from '../utils/helpers';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  username: string;

  @ApiProperty()
  @Expose()
  displayName: string;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty()
  @Transform(({ value }) => value && setFileUrl(value))
  @Expose()
  avatar: string;

  @ApiProperty()
  @Expose()
  postCount: number;

  @ApiProperty()
  @Expose()
  followersCount: number;

  @ApiProperty()
  @Expose()
  followingCount: number;

  @ApiProperty()
  @Expose()
  isFollow: boolean;

  @ApiProperty()
  @Expose()
  createdAt: string;
}
