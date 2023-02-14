import { Body, Controller, Get, Post, Put, Request, Res, UseGuards } from "@nestjs/common";
import { Response } from 'express';
import { JwtAuthGuard } from "src/Guards/JwtGuard";
import { ListService } from "src/Providers/ListService";
import { CreateListInputType, DeleteListInputType, UpdateListInputType } from "src/Types/ListTypes";

@Controller("/list")
export class ListController{
    constructor(
        private listService : ListService
    ){}

    @Get()
    @UseGuards(JwtAuthGuard)
    async findAllLists(
        @Res() response : Response,
        @Request() request
    ){
        try{
            return response.status(200).json({
                "msg" : "Successfully Fetched Data",
                "data" : await this.listService.findAllList(request.user?.email),
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
    @UseGuards(JwtAuthGuard)
    async createList(
        @Res() response : Response,
        @Body() body : CreateListInputType,
        @Request() request
    ){
        try{
            return response.status(200).json({
                "msg" : "Successfully created list",
                "data" : await this.listService.createList(body,request.user?.email),
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
    @UseGuards(JwtAuthGuard)
    async deleteList(
        @Res() response : Response,
        @Body() body : DeleteListInputType
    ){
        try{
            return response.status(200).json({
                "msg" : "Successfully deleted list",
                "data" : await this.listService.deleteList(body),
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
    @UseGuards(JwtAuthGuard)
    async updateList(
        @Res() response : Response,
        @Body() body : UpdateListInputType
    ){
        try{
            return response.status(200).json({
                "msg" : "Successfully updated list",
                "data" : await this.listService.updateList(body),
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