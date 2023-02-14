import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { List } from "./List";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id : number;

    @Column({unique : true, nullable : false})
    email: string;

    @Column({nullable : false})
    password : string;

    @OneToMany(()=>List,(list:List)=>list.user)
    lists : List[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}