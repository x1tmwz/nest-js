import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class IntimidatorsUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 200 })
  fullName: string;

  @Column('varchar', { length: 10 })
  phone: string;

  @Column('int', { width: 3 })
  tentacles: number;

  @Column('timestamp')
  date: string;

  @Column('varchar', { length: 150, })
  password: string;
}
