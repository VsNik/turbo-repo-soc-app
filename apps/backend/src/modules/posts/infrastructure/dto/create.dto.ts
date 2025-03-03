import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  caption: string;

  @ApiProperty({ type: 'string', format: 'binary', required: true })
  @IsString()
  @IsOptional()
  media: string;
}
