import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message as MessageEntity } from './models/message.entity';
import { Room as RoomEntity } from './models/room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity, RoomEntity])],
  providers: [ChatGateway],
})
export class ChatModule {}
