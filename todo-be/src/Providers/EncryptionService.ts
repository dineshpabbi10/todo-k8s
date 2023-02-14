import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncryptionService{
    encryptString(input : string){
        return bcrypt.hash(input, 10);
    }

    compareString(input : string,encryptedString : string){
        return bcrypt.compare(input, encryptedString); 
    }
}