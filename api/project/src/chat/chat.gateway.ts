import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { configProviders } from 'src/config/config.providers';
import { Chat } from './chat.dto';

@WebSocketGateway({
  namespace: 'chat',
  cors: { origin: configProviders.clientAppUrl },
  transports: ['websocket'],
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('ChatGateway');

  @SubscribeMessage('sendMessage')
  handleMessage(
    @MessageBody() payload: Chat,
    @ConnectedSocket() client: Socket,
  ) {
    this.logger.log({ wsEvent: client.id, ...payload });
    // save message
    // emit new message
    this.server.emit(`emitMessage-Room_${payload.roomId}`, {
      message: payload.message,
      roomId: payload.roomId,
      sender: payload.sender,
      postedAt: payload.postedAt,
    });
  }

  afterInit() {
    // socket server init
    this.logger.log('--- ws init ---');
  }

  handleConnection(client: Socket) {
    // クライアント接続時
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    // クライアント切断時
    this.logger.log(`Client disconnected: ${client.id}`);
  }
}
