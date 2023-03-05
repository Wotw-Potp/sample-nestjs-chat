import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Room extends BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column('text')
  name: string;
}
