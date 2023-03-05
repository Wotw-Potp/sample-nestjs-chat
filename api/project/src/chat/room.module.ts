import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatModule } from './chat.module';
import { Room } from './models/room.entity';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';

@Module({
  imports: [TypeOrmModule.forFeature([Room]), ChatModule],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
