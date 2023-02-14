import { Body, Controller, Post, Request, Res } from "@nestjs/common";
import { Response } from "express";
import { UserService } from "src/Providers/UserService";
import { UserInputType } from "src/Types/UserTypes";

@Controller("/user")
export class UserController{
    constructor(
        private userService : UserService
    ){}

  @Post('/login')
  async login(
    @Body() user : UserInputType,
    @Res() response : Response
    ) {
    try{
        const token  = await this.userService.login(user);
        return response.status(200).json({
            "msg" : "Successfully Logged In",
            "token" : token,
            "status" : true
        });
    }
    catch(e){
        return response.status(404).json({
            "msg" : e.message,
            "status" : false
        });
    }
  }

  @Post('/register')
  async register(
    @Body() user : UserInputType,
    @Res() response : Response
    ) {
    try{
        const savedUser  = await this.userService.createUser(user);
        const token = await this.userService.login(user);
        return response.status(200).json({
            "msg" : "Successfully Created User",
            "token" : token,
            "status" : true
        });
    }
    catch(e){
        return response.status(404).json({
            "msg" : e.message,
            "status" : false
        });
    }
  }
}