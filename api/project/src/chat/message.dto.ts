import type { User } from 'src/user/user.dto';
import type { Room } from './room.dto';

export type Message = {
  id: number;
  content: string;
  room: Room;
  sender: User;
  createdAt: Date;
};
