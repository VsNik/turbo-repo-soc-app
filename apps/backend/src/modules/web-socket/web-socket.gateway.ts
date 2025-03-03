/* eslint-disable @typescript-eslint/no-unused-vars */
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: process.env.CLIENT_URL,
  },
})
export class WebsocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  socketMap = new Map<string, string>();
  private readonly logger = new Logger(WebsocketGateway.name);

  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  afterInit() {
    this.logger.log('WS Gateway Initialized');
  }

  async handleConnection(socket: Socket, ...args: any[]) {
    const token = socket.handshake.auth?.token;
    if (!token) {
      socket.disconnect(true);
      return;
    }

    const decode = this.decodeToken(token);

    if (!this.socketMap.has(decode.id)) {
      this.socketMap.set(decode.id, socket.id);
    }

    this.server.emit('online-users', Array.from(this.socketMap.keys()));
    this.logger.log(`Connected: ${decode.id}`);
    return;
  }

  async handleDisconnect(socket: Socket) {
    const userId = Array.from(this.socketMap).find(
      ([_, value]) => socket.id === value,
    )?.[0];

    this.socketMap.delete(userId);
    this.server.emit('online-users', Array.from(this.socketMap.keys()));
    this.logger.log(`Disconnected: ${userId}`);
  }

  private decodeToken(token: string): { id: string } {
    try {
      return this.jwt.verify(token, {
        secret: this.config.getOrThrow('JWT_SECRET'),
      });
    } catch (err) {
      console.log(err);
    }
  }
}
