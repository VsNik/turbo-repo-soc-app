import { Injectable } from '@nestjs/common';
import { WebsocketGateway } from '../web-socket/web-socket.gateway';

@Injectable()
export class NotificationsGateway extends WebsocketGateway {}
