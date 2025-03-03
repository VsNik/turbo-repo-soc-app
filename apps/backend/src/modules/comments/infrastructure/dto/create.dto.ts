import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatetDto {
  @ApiProperty({ example: 'Nla bla bla' })
  @IsString()
  @IsNotEmpty()
  content: string;
}
