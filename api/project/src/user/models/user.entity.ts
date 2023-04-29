import { Message } from 'src/chat/models/message.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 32,
  })
  uid: string;

  @Column('text')
  name: string;

  @OneToMany(() => Message, (message) => message.sender)
  messages: Message[];
}
