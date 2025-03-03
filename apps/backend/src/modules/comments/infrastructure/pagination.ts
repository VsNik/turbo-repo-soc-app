import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class Pagination {
  @Type(() => Number)
  @IsNumber()
  page: number = 1;

  @Type(() => Number)
  @IsNumber()
  limit: number = 10;
}
