import { IsString, IsUUID, Length } from 'class-validator';
import { Message } from './message.dto';

export type Room = {
  id: string;
  name: string;
  messages: Message[];
};

export class CreateRoomDto {
  @IsString()
  @Length(5, 20)
  name: Room['name'];
}

export class GetRoomDto {
  @IsUUID()
  id: Room['id'];
}
