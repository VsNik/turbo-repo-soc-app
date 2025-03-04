import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { WebsocketGateway } from './web-socket.gateway';

@Global()
@Module({
  imports: [JwtModule, JwtModule],
  providers: [WebsocketGateway],
  exports: [WebsocketGateway],
})
export class WebSocketModule {}
