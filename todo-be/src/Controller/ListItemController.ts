import { Body, Controller, Get, Post, Put, Query, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { JwtAuthGuard } from "src/Guards/JwtGuard";
import { ListItemService } from "src/Providers/ListItemService";
import { CreateListItemInputType, DeleteListItemInputType, UpdateListItemInputType } from "src/Types/ListItemTypes";

@Controller("/listitem")
export class ListItemController{
    constructor(
        private listItemService : ListItemService
    ){}

    @Get()
    @UseGuards(JwtAuthGuard)
    async findAllListItems(
        @Res() response : Response,
        @Query('listId') listId : number
    ){
        try{
            console.log(listId);
            return response.status(200).json({
                "msg" : "Successfully Fetched Data",
                "data" : await this.listItemService.findAllListItemsByListId(listId),
                "status" : true
            });
        }catch(e){
            return response.status(404).json({
                "msg" : e.message,
                "status" : false
            });
        }
    }

    @Post()
    async createListItem(
        @Res() response : Response,
        @Body() body : CreateListItemInputType
    ){
        try{
            return response.status(200).json({
                "msg" : "Successfully created list item",
                "data" : await this.listItemService.createListItem(body),
                "status" : true
            });
        }catch(e){
            return response.status(404).json({
                "msg" : e.message,
                "status" : false
            });
        }
    }

    @Post("/delete")
    async deleteListItem(
        @Res() response : Response,
        @Body() body : DeleteListItemInputType
    ){
        try{
            return response.status(200).json({
                "msg" : "Successfully deleted list item",
                "data" : await this.listItemService.deleteListItem(body),
                "status" : true
            });
        }catch(e){
            return response.status(404).json({
                "msg" : e.message,
                "status" : false
            });
        }
    }

    @Put()
    async updateList(
        @Res() response : Response,
        @Body() body : UpdateListItemInputType
    ){
        try{
            return response.status(200).json({
                "msg" : "Successfully updated list",
                "data" : await this.listItemService.updateListItem(body),
                "status" : true
            });
        }catch(e){
            return response.status(404).json({
                "msg" : e.message,
                "status" : false
            });
        }
    }
}