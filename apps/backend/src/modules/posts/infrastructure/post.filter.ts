import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { PostType } from 'src/common/types';

export class Pagination {
  @Type(() => Number)
  @IsNumber()
  page: number = 1;

  @Type(() => Number)
  @IsNumber()
  limit: number = 10;
}

export class PostsFilter extends Pagination {
  @IsString()
  type?: PostType;
}
