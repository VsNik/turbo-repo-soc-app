import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateDto {
  @ApiProperty({ example: 'IvanovIvan' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'ivan@app.test' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  @Length(4, 24)
  @IsNotEmpty()
  password: string;
}
