import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatModule } from './chat.module';
import { Room as RoomEntity } from './models/room.entity';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { Message as MessageEntity } from './models/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoomEntity, MessageEntity]), ChatModule],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
