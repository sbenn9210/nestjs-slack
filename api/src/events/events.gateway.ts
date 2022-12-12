import { Server } from 'socket.io';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway()
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() data: any): any {
    console.log(data);
    this.server.emit('onMessage', {
      msg: 'New message',
      content: data,
    });
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    return data;
  }
}
