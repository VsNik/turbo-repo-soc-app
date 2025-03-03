import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class IdResponse {
  @ApiProperty({ example: '8779747f-8874-44b1-864b-aa60e9f8d593' })
  @Expose()
  id: string;
}
