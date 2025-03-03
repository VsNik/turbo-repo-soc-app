import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateCommand, LoginCommand } from './application';
import { CreateDto, IUser, LoginDto } from './infrastructure';
import { fillObject } from 'src/common/utils/helpers';
import { AuthResponse, UserResponse } from 'src/common/responses';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { CurrentUser, JwtAuthGuard } from 'src/common/auth';

@Controller()
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiCreatedResponse({ type: AuthResponse })
  @Post('signup')
  async signup(@Body() dto: CreateDto) {
    const command = new CreateCommand(dto);
    const result = await this.commandBus.execute(command);
    return fillObject(AuthResponse, result);
  }

  @ApiOkResponse({ type: AuthResponse })
  @Post('login')
  async login(@Body() dto: LoginDto) {
    const command = new LoginCommand(dto);
    const result = await this.commandBus.execute(command);
    return fillObject(AuthResponse, result);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: UserResponse })
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async checkMe(@CurrentUser() user: IUser) {
    return fillObject(UserResponse, user);
  }
}
