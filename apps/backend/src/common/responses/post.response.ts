import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { setFileUrl } from '../utils';
import { UserResponse } from './user.response';
import { PostType } from '../types';

export class PostResponse {
  @ApiProperty({ example: '8779747f-8874-44b1-864b-aa60e9f8d593' })
  @Expose()
  id: string;

  @ApiProperty({
    example: `http://localhost:5000/image/9aec315c-ab8f-48e5-84ea-30008ed33d10.jpeg`,
  })
  @Transform(({ value }) => setFileUrl(value))
  @Expose()
  media: string;

  @ApiProperty({ example: 'Bla bla bla' })
  @Expose()
  caption: string;

  @ApiProperty({ type: UserResponse })
  @Type(() => UserResponse)
  @Expose()
  author: UserResponse;

  @ApiProperty({ example: 5 })
  @Expose()
  likeCount: number;

  @ApiProperty({ example: 5 })
  @Expose()
  favoriteCount: number;

  @ApiProperty({ example: PostType.Image })
  @Expose()
  postType: PostType;

  @ApiProperty({ example: '2024-08-13 16:21:33.049+00' })
  @Expose()
  createdAt: string;
}

export class PostCollection {
  @ApiProperty({ type: [PostResponse] })
  @Expose()
  @Type(() => PostResponse)
  data: PostResponse[];

  @ApiProperty({ example: 1 })
  @Expose()
  page: number;

  @ApiProperty({ example: 10 })
  @Expose()
  pageCount: number;

  @ApiProperty({ example: 10 })
  @Expose()
  limit: number;

  @ApiProperty({ example: 100 })
  @Expose()
  total: number;
}
