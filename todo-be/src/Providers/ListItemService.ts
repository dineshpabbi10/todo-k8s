import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { List } from "../Entities/List";
import { ListItem } from "../Entities/ListItem";
import { Repository } from "typeorm";
import { CreateListItemInputType, DeleteListItemInputType } from "src/Types/ListItemTypes";

@Injectable()
export class ListItemService{
    constructor(
        @InjectRepository(List)
        private listRepository: Repository<List>,
        @InjectRepository(ListItem)
        private listItemRepository : Repository<ListItem>
    ){}

    async createListItem(input : CreateListItemInputType){
        try{
            const listItemObj = new ListItem();
            const list = await this.listRepository.findOneOrFail({
                where : {
                    id : input.list_id,
                }
            });
            listItemObj.is_completed = false;
            listItemObj.item_details = input.item_details;
            listItemObj.list = list;
            return this.listItemRepository.save(listItemObj);
        }catch(e){
            throw e;
        }
    }

    async deleteListItem(input : DeleteListItemInputType){
        try{
            const listItemObj = await this.listItemRepository.findOneOrFail({
                where : {
                    id : input.id,
                }
            });
            return this.listItemRepository.delete(listItemObj);
        }catch(e){
            throw e;
        }
    }

    async updateListItem(input : DeleteListItemInputType){
        try{
            const listItemObj = await this.listItemRepository.findOneOrFail({
                where : {
                    id : input.id,
                }
            });
            return this.listItemRepository.delete(listItemObj);
        }catch(e){
            throw e;
        }
    }

    async findAllListItemsByListId(listId : number){
        try{
            const listObject = await this.listRepository.findOneOrFail({
                where : {
                    id : listId
                }
            });

            return this.listItemRepository.find({
                where : {
                    list : {
                        id : listObject.id
                    }
                }
            });
        }catch(e){
            throw e;
        }
    }
}