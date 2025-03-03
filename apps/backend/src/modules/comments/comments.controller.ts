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
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CurrentUser, JwtAuthGuard } from 'src/common/auth';
import { CreatetDto, Pagination } from './infrastructure';
import { User } from '../users/domain';
import { plainToInstance } from 'class-transformer';
import { fillObject } from 'src/common/utils';
import {
  ByPostQuery,
  CreateCommand,
  RemoveCommand,
  ToggleLikeCommand,
} from './application';
import { CommentResponse, IdResponse } from 'src/common/responses';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiOperation({ summary: 'Список комментариев поста' })
  @ApiOkResponse({ type: [CommentResponse] })
  @Get(':postId')
  async getPostComments(
    @Param('postId', ParseUUIDPipe) postId: string,
    @Query() paginationQuery: Pagination,
    @CurrentUser() currentUser: User,
  ) {
    const pagination = plainToInstance(Pagination, paginationQuery);
    const query = new ByPostQuery(postId, pagination, currentUser);
    const result = await this.queryBus.execute(query);
    return fillObject(CommentResponse, result);
  }

  @ApiOperation({ summary: 'Создать комментарий' })
  @ApiCreatedResponse({ type: CommentResponse })
  @Post(':postId')
  async create(
    @Param('postId', ParseUUIDPipe) postId: string,
    @Body() { content }: CreatetDto,
    @CurrentUser() currentUser: User,
  ) {
    const command = new CreateCommand(postId, content, currentUser);
    const result = await this.commandBus.execute(command);
    return fillObject(CommentResponse, result);
  }

  @ApiOperation({ summary: 'Like / Unlike' })
  @ApiOkResponse({ type: CommentResponse })
  @HttpCode(HttpStatus.OK)
  @Post(':commentId/like')
  async toggleLike(
    @Param(':commentId') commentId: string,
    @CurrentUser() currentUser: User,
  ) {
    const command = new ToggleLikeCommand(commentId, currentUser);
    const result = await this.commandBus.execute(command);
    return fillObject(CommentResponse, result);
  }

  @ApiOperation({ summary: 'Удалить комментарий' })
  @ApiOkResponse({ type: IdResponse })
  @Delete(':commentId')
  async delete(
    @Param('commentId', ParseUUIDPipe) commentId: string,
    @CurrentUser() currentUser: User,
  ) {
    const command = new RemoveCommand(commentId, currentUser);
    const result = await this.commandBus.execute(command);
    return fillObject(IdResponse, result);
  }
}
