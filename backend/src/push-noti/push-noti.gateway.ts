import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class PushNotiGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  // Khi một User kết nối vào Server
  async handleConnection(client: Socket) {
    const rawUser = client.handshake.auth?.user ?? client.handshake.query.user;
    const rawUserId = rawUser?._id || rawUser?.id || rawUser;
    const userId = Array.isArray(rawUserId) ? rawUserId[0] : rawUserId;

    if (typeof userId === 'string' && userId) {
      await client.join(String(userId));
      console.log(
        `User [${rawUser.fullName}] | ID: ${userId} | đã kết nối và tham gia phòng riêng.`,
      );
    }
  }

  // Khi User ngắt kết nối
  handleDisconnect(client: Socket) {
    console.log(`Một kết nối đã ngắt: ${client.id}`);
  }

  // Hàm này để các Service khác trong Backend gọi tới
  sendNotificationToUser(userId: string, data: any) {
    const targetRoom = String(userId);
    this.server.to(targetRoom).emit('new_notification', data);
    console.log(`Đã gửi new_notification tới room ${targetRoom}`);
  }
}
