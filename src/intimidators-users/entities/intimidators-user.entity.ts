import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class IntimidatorsUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100, unique: true })
  userName: string;

  @Column('varchar', { length: 100 })
  fullName: string;

  @Column('varchar', { length: 10 })
  phone: string;

  @Column('int')
  tentacles: number;

  @Column('timestamp')
  date: string;

  @Column('varchar', { length: 500 })
  password: string;
}

export const fullKeyList = [
  'userName',
  'fullName',
  'phone',
  'tentacles',
  'password',
];
