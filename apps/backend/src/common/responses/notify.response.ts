import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { UserResponse } from './user.response';
import { PostResponse } from './post.response';
import { NotificationType } from '../types';

// class UserInfo {
//   @Expose()
//   id: string;
//   @Expose()
//   username: string;
//   @Expose()
//   displayName: string;
//   @Expose()
//   avatar: string;
// }

// class PostInfo {
//   @Expose()
//   id: string;
//   @Expose()
//   media: string;
//   @Expose()
//   postType: PostType;
//   @Expose()
//   caption: string;
// }

export class NotifyResponse {
  @ApiProperty({ example: 'bc36d4d7-ac6f-4dde-91f3-2896f260ce26' })
  @Expose()
  id: string;

  @ApiProperty({ type: UserResponse })
  @Expose()
  @Type(() => UserResponse)
  issuer: UserResponse;

  @ApiProperty({ type: PostResponse })
  @Expose()
  @Type(() => PostResponse)
  post?: PostResponse;

  // @ApiProperty({ type: UserInfo })
  // @Expose()
  // @Type(() => UserInfo)
  // issuer: UserInfo;

  // @ApiProperty({ type: PostInfo })
  // @Expose()
  // @Type(() => PostInfo)
  // post?: PostInfo;

  @ApiProperty({ enum: NotificationType, example: NotificationType.Like })
  @Expose()
  type: NotificationType;

  @ApiProperty({ example: '2024-08-13 16:21:33.049+00' })
  @Expose()
  createdAt: string;
}
