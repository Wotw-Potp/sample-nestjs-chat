import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Message } from './message.entity';

@Entity()
export class Room extends BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column('text')
  name: string;

  @OneToMany(() => Message, (message) => message.room)
  messages: Message[];
}
