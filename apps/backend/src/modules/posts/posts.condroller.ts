import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { CurrentUser, JwtAuthGuard } from 'src/common/auth';
import {
  AllQuery,
  CreateCommand,
  DeleteCommand,
  FavoritesQuery,
  FeedQuery,
  ShowQuery,
  ToggleFavoriteCommand,
  ToggleLikeCommand,
  UserPostsQuery,
} from './application';
import { fillObject } from 'src/common/utils';
import { User } from '../users/domain';
import { FileExpress, PostType } from 'src/common/types';
import { IdResponse, PostResponse } from 'src/common/responses';
import { CreateDto, PostsFilter } from './infrastructure';
import { PostCollection } from 'src/common/responses/post.response';
import { plainToInstance } from 'class-transformer';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiOperation({ summary: 'Список всех постов' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'type', required: false, enum: PostType })
  @ApiOkResponse({ type: PostCollection })
  @Get()
  async index(
    @Query() postsFilter: PostsFilter,
    @CurrentUser() currentUser: User,
  ) {
    const filter = plainToInstance(PostsFilter, postsFilter);
    const query = new AllQuery(filter, currentUser);
    const [data, total] = await this.queryBus.execute(query);
    return fillObject(PostCollection, {
      data,
      pageCount: Math.ceil(total / filter.limit),
      total,
      ...filter,
    });
  }

  @ApiOperation({ summary: 'Лента' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'type', required: false, enum: PostType })
  @ApiOkResponse({ type: PostCollection })
  @Get('feed')
  async feed(
    @Query() postsFilter: PostsFilter,
    @CurrentUser() currentUser: User,
  ) {
    const filter = plainToInstance(PostsFilter, postsFilter);
    const query = new FeedQuery(filter, currentUser);
    const [data, total] = await this.queryBus.execute(query);
    return fillObject(PostCollection, {
      data,
      pageCount: Math.ceil(total / filter.limit),
      total,
      ...filter,
    });
  }

  @ApiOperation({ summary: 'Список избранного' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'type', required: false, enum: PostType })
  @ApiOkResponse({ type: PostCollection })
  @Get('favorites')
  async favorites(
    @Query() postsFilter: PostsFilter,
    @CurrentUser('id') currentId: string,
  ) {
    const filter = plainToInstance(PostsFilter, postsFilter);
    const query = new FavoritesQuery(filter, currentId);
    const [data, total] = await this.queryBus.execute(query);
    return {
      data,
      pageCount: Math.ceil(total / filter.limit),
      total,
      ...filter,
    };
  }

  @ApiOperation({ summary: 'Просмотр поста' })
  @ApiOkResponse({ type: PostResponse })
  @Get(':id')
  async show(
    @Param('id', ParseUUIDPipe) postId: string,
    @CurrentUser() currentUser: User,
  ) {
    const query = new ShowQuery(postId, currentUser);
    const result = await this.queryBus.execute(query);
    return fillObject(PostResponse, result);
  }

  @ApiOperation({ summary: 'Список постов пользователя' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'type', required: false, enum: PostType })
  @ApiOkResponse({ type: PostCollection })
  @Get(':id/user')
  async getByUser(
    @Param('id', ParseUUIDPipe) userId: string,
    @Query() postsFilter: PostsFilter,
    @CurrentUser() currentUser: User,
  ) {
    const filter = plainToInstance(PostsFilter, postsFilter);
    const query = new UserPostsQuery(userId, filter, currentUser);
    const [data, total] = await this.queryBus.execute(query);
    return {
      data,
      pageCount: Math.ceil(total / filter.limit),
      total,
      ...filter,
    };
  }

  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Создать новый пост' })
  @ApiCreatedResponse({ type: PostResponse })
  @UseInterceptors(FileInterceptor('media'))
  @Post()
  async create(
    @Body() { caption }: CreateDto,
    @CurrentUser() user: User,
    @UploadedFile() file: FileExpress,
  ) {
    const command = new CreateCommand(user, file, caption);
    const result = await this.commandBus.execute(command);
    return fillObject(PostResponse, result);
  }

  @ApiOperation({ summary: 'Like / Unlike' })
  @ApiOkResponse({ type: PostResponse })
  @HttpCode(HttpStatus.OK)
  @Post(':postId/like')
  async toggleLike(
    @Param('postId', ParseUUIDPipe) postId: string,
    @CurrentUser() currentUser: User,
  ) {
    const command = new ToggleLikeCommand(postId, currentUser);
    const result = await this.commandBus.execute(command);
    return fillObject(PostResponse, result);
  }

  @ApiOperation({ summary: 'Favorite / Unfavorite' })
  @ApiOkResponse({ type: PostResponse })
  @HttpCode(HttpStatus.OK)
  @Post(':id/favorite')
  async toggleFavorite(
    @Param('id', ParseUUIDPipe) postId: string,
    @CurrentUser('id') currentId: string,
  ) {
    const command = new ToggleFavoriteCommand(postId, currentId);
    const result = await this.commandBus.execute(command);
    return fillObject(PostResponse, result);
  }

  @ApiOperation({ summary: 'Удалить пост' })
  @ApiOkResponse({ type: IdResponse })
  @Delete(':id')
  async delete(
    @Param('id', ParseUUIDPipe) postId: string,
    @CurrentUser() currentUser: User,
  ) {
    const command = new DeleteCommand(postId, currentUser);
    const result = await this.commandBus.execute(command);
    return fillObject(IdResponse, result);
  }
}
