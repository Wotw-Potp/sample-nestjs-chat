import { User } from 'src/user/user.dto';
import { Room } from './room.dto';

export type Chat = {
  message: string;
  roomId: Room['id'];
  sender: User;
  postedAt: string;
};
