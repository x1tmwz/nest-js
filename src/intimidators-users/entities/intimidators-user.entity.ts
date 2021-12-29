import { Entity, Column, PrimaryGeneratedColumn,CreateDateColumn } from 'typeorm';

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

  @CreateDateColumn()
  date:string

  @Column('varchar', { length: 150 })
  password: string;
}

export const fullKeyList = [
  'userName',
  'fullName',
  'phone',
  'tentacles',
  'password',
];
