import { IsString, IsUUID, Length } from 'class-validator';

export type Room = {
  id: string;
  name: string;
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
