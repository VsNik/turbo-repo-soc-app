import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  displayName: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
  })
  @IsString()
  @IsOptional()
  avatar: string;
}
