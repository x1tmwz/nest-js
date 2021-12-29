import { Entity,ManyToOne, PrimaryGeneratedColumn,Column } from "typeorm";
import { Door } from "src/doors/entities/door.entity";
import { IntimidatorsUser } from "src/intimidators-users/entities/intimidators-user.entity";

@Entity()
export class WorkDay {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=>Door,(door)=>door.id)
    door:number;

    @Column({type:"datetime",default:new Date().toISOString().replace(/T|Z/g,' ')})
    date:string

    @ManyToOne(()=>IntimidatorsUser,(intimidatorsUser)=>intimidatorsUser.id)
    monster:number;
}
