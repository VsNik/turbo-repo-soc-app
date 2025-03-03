import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiOkResponse } from '@nestjs/swagger';
import { CurrentUser, JwtAuthGuard } from 'src/common/auth';
import { UserResponse } from 'src/common/responses';
import { fillObject } from 'src/common/utils';
import { UpdateDto } from './infrastructure';
import { FileExpress } from 'src/common/types';
import {
  FollowCommand,
  GetFollowersQuery,
  SearchQuery,
  ShowQuery,
  SuggestedQuery,
  UpdateCommand,
} from './application';
import { GetFollowingsQuery } from './application/query/get-followings/get-followings.query';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiOkResponse({ type: [UserResponse] })
  @Get()
  async search(
    @Query('query') search: string,
    @CurrentUser('id', ParseUUIDPipe) currentId: string,
  ) {
    const query = new SearchQuery(search, currentId);
    const results = await this.queryBus.execute(query);
    return fillObject(UserResponse, results);
  }

  @ApiOkResponse({ type: [UserResponse] })
  @Get('suggested')
  async suggested(@CurrentUser('id', ParseUUIDPipe) currentId: string) {
    const query = new SuggestedQuery(currentId);
    const results = await this.queryBus.execute(query);
    return fillObject(UserResponse, results);
  }

  @ApiOkResponse({ type: UserResponse })
  @Get(':id')
  async show(
    @Param('id', ParseUUIDPipe) userId: string,
    @CurrentUser('id', ParseUUIDPipe) currentId: string,
  ) {
    const query = new ShowQuery(userId, currentId);
    const result = await this.queryBus.execute(query);
    return fillObject(UserResponse, result);
  }

  @ApiOkResponse({ type: [UserResponse] })
  @Get(':id/followers')
  async getFollowers(
    @Param('id', ParseUUIDPipe) userId: string,
    @CurrentUser('id', ParseUUIDPipe) currentId: string,
  ) {
    const query = new GetFollowersQuery(userId, currentId);
    const results = await this.queryBus.execute(query);
    return fillObject(UserResponse, results);
  }

  @ApiOkResponse({ type: [UserResponse] })
  @Get(':id/followings')
  async getFollowings(
    @Param('id', ParseUUIDPipe) userId: string,
    @CurrentUser('id', ParseUUIDPipe) currentId: string,
  ) {
    const query = new GetFollowingsQuery(userId, currentId);
    const results = await this.queryBus.execute(query);
    return fillObject(UserResponse, results);
  }

  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({ type: UserResponse })
  @UseInterceptors(FileInterceptor('avatar'))
  @Put()
  async updateMe(
    @Body() { displayName }: UpdateDto,
    @CurrentUser('id', ParseUUIDPipe) currentId,
    @UploadedFile() file: FileExpress,
  ) {
    const command = new UpdateCommand(displayName, currentId, file);
    const result = await this.commandBus.execute(command);
    return fillObject(UserResponse, result);
  }

  @ApiOkResponse({ type: UserResponse })
  @Post(':id/follow')
  async follow(
    @Param('id', ParseUUIDPipe) followId: string,
    @CurrentUser('id') currentId: string,
  ) {
    const command = new FollowCommand(followId, currentId);
    const result = await this.commandBus.execute(command);
    return fillObject(UserResponse, result);
  }
}
