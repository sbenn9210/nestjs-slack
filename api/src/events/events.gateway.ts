import { Server, Socket } from 'socket.io';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { OnModuleInit } from '@nestjs/common';
import { nanoid } from 'nanoid';

const EVENTS = {
  connection: 'connection',
  CLIENT: {
    CREATE_ROOM: 'CREATE_ROOM',
    SEND_ROOM_MESSAGE: 'SEND_ROOM_MESSAGE',
    JOIN_ROOM: 'JOIN_ROOM',
  },
  SERVER: {
    ROOMS: 'ROOMS',
    JOINED_ROOM: 'JOINED_ROOM',
    ROOM_MESSAGE: 'ROOM_MESSAGE',
  },
};

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
  },
})
export class EventsGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on(EVENTS.connection, (socket) => {
      console.log(`User connected on ${socket.id}`);
    });
  }

  @SubscribeMessage(EVENTS.CLIENT.CREATE_ROOM)
  onCreateRoom(
    @MessageBody() data: any,
    @ConnectedSocket() socket: Socket,
  ): any {
    const rooms: Record<string, { name: string }> = {};
    console.log(data);

    // create a roomId
    const roomId = nanoid();

    // add a new room to the rooms object

    rooms[roomId] = {
      name: data.roomName,
    };

    console.log(rooms);

    socket.join(roomId);

    // broadcast an event saying there is a new room
    socket.broadcast.emit(EVENTS.SERVER.ROOMS, rooms);

    // emit back to the room creator will all the rooms
    socket.emit(EVENTS.SERVER.ROOMS, rooms);

    // emit back to the room create saying htey have joined a room
    socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId);
  }

  @SubscribeMessage(EVENTS.CLIENT.SEND_ROOM_MESSAGE)
  onSendRoomMessage(
    @MessageBody() data: any,
    @ConnectedSocket() socket: Socket,
  ): any {
    const date = new Date();
    console.log(data);

    socket.to(data.roomId).emit(EVENTS.SERVER.ROOM_MESSAGE, {
      message: data.message,
      username: data.username,
      time: `${date.getHours()}:${date.getMinutes()}`,
    });
  }

  @SubscribeMessage(EVENTS.CLIENT.JOIN_ROOM)
  onJoinRoom(@MessageBody() data: any, @ConnectedSocket() socket: Socket): any {
    console.log(data);
    socket.join(data);
    socket.emit(EVENTS.SERVER.JOINED_ROOM, data);
  }

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
