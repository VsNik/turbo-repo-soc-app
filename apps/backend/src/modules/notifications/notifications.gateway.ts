import { Injectable } from '@nestjs/common';
import { WebsocketGateway } from '../web-socket/web-socket.gateway';
import { Notification } from './domain';
import { fillObject } from 'src/common/utils';
import { NotifyResponse } from 'src/common/responses';

@Injectable()
export class NotifyGateway {
  constructor(private readonly gateway: WebsocketGateway) {}

  async emitNotification(notifications: Notification[]) {
    notifications.map((notify) => {
      const sid = this.gateway.socketMap.get(notify.receiveId);
      console.log(fillObject(NotifyResponse, notify));
      if (sid) {
        this.gateway.server
          .to(sid)
          .emit('notification', fillObject(NotifyResponse, notify));
      } else {
        console.log('user is not online at the moment!');
      }
    });
  }
}

// @Injectable()
// export class NotificationsGateway extends WebsocketGateway {
//   async emitNotification(notifications: Notification[]) {
//     notifications.map((notify) => {
//       const sid = this.socketMap.get(notify.receiveId);

//       if (sid) {
//         this.server
//           .to(sid)
//           .emit('notification', fillObject(NotifyResponse, notify));
//       } else {
//         console.log('user is not online at the moment!');
//       }
//     });
//   }
// }
