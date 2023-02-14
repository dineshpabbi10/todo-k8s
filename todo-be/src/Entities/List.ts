import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ListItem } from "./ListItem";
import { User } from "./Users";

@Entity()
export class List {
    @PrimaryGeneratedColumn()
    id : number;

    @Column({nullable : false})
    list_name : string;

    @OneToMany(()=>ListItem,(item : ListItem)=> item.list)
    list_items : ListItem[];

    @ManyToOne(()=>User,(user:User)=>user.lists)
    user : User;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}