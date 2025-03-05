import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CurrentUser, JwtAuthGuard } from 'src/common/auth';
import { DeleteCommand, GetByUserQuery } from './application';
import { fillObject } from 'src/common/utils';
import { IdResponse, NotifyResponse } from 'src/common/responses';
import { ApiBasicAuth } from '@nestjs/swagger';

@ApiBasicAuth()
@UseGuards(JwtAuthGuard)
@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async index(@CurrentUser('id') currentId: string) {
    const query = new GetByUserQuery(currentId);
    const results = this.queryBus.execute(query);
    return fillObject(NotifyResponse, results);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @CurrentUser('id') currentIs: string) {
    const command = new DeleteCommand(id, currentIs);
    const result = this.commandBus.execute(command);
    return fillObject(IdResponse, result);
  }
}
