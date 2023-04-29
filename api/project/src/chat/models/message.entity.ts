import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Room } from './room.entity';
import { User } from 'src/user/models/user.entity';

@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Room, (room) => room.messages)
  room: Room;

  @ManyToOne(() => User, (user) => user.messages)
  sender: User;

  @Column('text')
  content: string;

  @CreateDateColumn()
  createdAt: Date;
}
