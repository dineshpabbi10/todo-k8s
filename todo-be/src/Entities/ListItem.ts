import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { List } from "./List";

@Entity()
export class ListItem{
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    item_details : string;

    @Column({default : false})
    is_completed : boolean;

    @ManyToOne(()=> List,(list : List)=> list.list_items)
    @JoinColumn({name : "list_id"})
    list : List;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}