import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/Entities/Users";
import { UserInputType } from "src/Types/UserTypes";
import { Repository } from "typeorm";
import { EncryptionService } from "./EncryptionService";

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
        private userRepository : Repository<User>,
        private encryptionService : EncryptionService,
        private jwtService : JwtService
    ){}

    async createUser(input : UserInputType){
        try{
            let user = await this.userRepository.findOne({
                where : {
                    email : input.email
                }
            });
            
            if(user !== null) throw new Error("User already registered !");
            user = new User();
            user.email = input.email;
            user.password = await this.encryptionService.encryptString(input.password);
            return this.userRepository.save(user);
        }catch(e){
            throw e;
        }
    }

    async validateUser(input : UserInputType){
        try{
            let user = await this.userRepository.findOne({
                where : {
                    email : input.email
                }
            });
            
            if(user === null) throw new Error("User not registered !");
            return this.encryptionService.compareString(input.password,user.password);
        }catch(e){
            throw e;
        }
    }

    async login(input : UserInputType) {
        try{
            let user = await this.userRepository.findOne({
                where : {
                    email : input.email
                }
            });
            
            /* If no user found */
            if(user === null) throw new Error("User not registered !");
            /* Compare Password */
            if(await this.encryptionService.compareString(input.password,user.password)) 
                return this.jwtService.sign({email : user.email});
            else 
                throw new Error("Password Incorrect");
            
        }catch(e){
            throw e;
        }
    }

}