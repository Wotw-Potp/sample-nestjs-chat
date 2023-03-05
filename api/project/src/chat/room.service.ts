import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { Room as RoomEntity } from './models/room.entity';
import { CreateRoomDto, Room } from './room.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomEntity)
    private roomRepository: Repository<RoomEntity>,
  ) {}

  async create(room: CreateRoomDto): Promise<Room | null> {
    const newRoom = {
      id: randomUUID(),
      name: room.name,
    };
    await this.roomRepository.insert(newRoom);
    return await this.findOne(newRoom.id);
  }

  async findOne(id: string): Promise<Room | null> {
    return await this.roomRepository.findOneBy({ id: id });
  }
}
