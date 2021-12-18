import { Entity,ManyToOne, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import { Door } from "src/doors/entities/door.entity";
import { IntimidatorsUser } from "src/intimidators-users/entities/intimidators-user.entity";

@Entity()
export class WorkDay {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=>Door)
    door:Door;

    @CreateDateColumn()
    date:string

    @ManyToOne(()=>IntimidatorsUser)
    monster:IntimidatorsUser;
}
