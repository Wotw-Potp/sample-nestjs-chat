import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateRoomDto, GetRoomDto } from './room.dto';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post('create')
  async create(@Body() createRoom: CreateRoomDto) {
    return await this.roomService.create(createRoom);
  }

  @Get(':id')
  async get(@Param() params: GetRoomDto) {
    return await this.roomService.findOne(params.id);
  }
}
