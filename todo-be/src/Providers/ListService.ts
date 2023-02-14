import { Injectable } from "@nestjs/common";
import { List } from "../Entities/List";
import { Repository } from "typeorm";
import { ListItem } from "../Entities/ListItem";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateListInputType, DeleteListInputType, UpdateListInputType } from "src/Types/ListTypes";
import { User } from "src/Entities/Users";

@Injectable()
export class ListService{
    constructor(
        @InjectRepository(List)
        private listRepository: Repository<List>,
        @InjectRepository(ListItem)
        private listItemRepository : Repository<ListItem>,
        @InjectRepository(User)
        private userRepository : Repository<User>
    ){};

    async createList(input : CreateListInputType,userEmail : string) : Promise<List> {
        try{
            const list = new List();
            const user = await this.userRepository.findOneOrFail({
                where : {
                    email : userEmail
                }
            });
            list.list_name = input.name;
            list.user = user;
            return this.listRepository.save(list);
        }catch(e){
            throw e;
        }
    }

    async updateList(input : UpdateListInputType){
        try{
            const object = await this.listRepository.findOneOrFail({
                where : {
                    id : input.id
                }
            });
            object.list_name = input.name;
            return this.listRepository.save(object);
        }catch(e){
            throw e;
        }
    }

    async deleteList(input : DeleteListInputType){
        try{
            const object = await this.listRepository.findOneOrFail({
                where : {
                    id : input.id
                }
            });

            await this.listItemRepository.delete(object.list_items.map(e=>e.id));
            return this.listRepository.delete(object);
        }catch (e){
            throw e;
        }
    }

    findAllList(email : string){
        try{
            return this.listRepository.find({
                where : {
                    user : {
                        email : email
                    }
                }
            });
        }catch (e){
            throw e;
        }
    }
}