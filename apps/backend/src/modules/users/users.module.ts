import { Module } from '@nestjs/common';
import { USERS_REPO } from './domain/users-repository.interface';
import { JwtAuthStrategy, UsersRepository } from './infrastructure';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from './domain';
import { AuthController } from './auth.controller';
import {
  AuthTokenService,
  COMMAND_HANDLERS,
  QUERY_HANDLERS,
} from './application';
import { getJWTConfig } from 'src/common/config';
import { FILE_UPLOADER } from 'src/common/types';
import { FsUploader } from 'src/common/utils';
import { UsersController } from './users.controller';

@Module({
  imports: [
    CqrsModule,
    JwtModule.registerAsync(getJWTConfig()),
    MikroOrmModule.forFeature([User]),
  ],
  providers: [
    ...COMMAND_HANDLERS,
    ...QUERY_HANDLERS,
    {
      provide: USERS_REPO,
      useClass: UsersRepository,
    },
    {
      provide: FILE_UPLOADER,
      useClass: FsUploader,
    },
    AuthTokenService,
    JwtAuthStrategy,
  ],
  controllers: [AuthController, UsersController],
})
export class UsersModule {}
