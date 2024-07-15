import { Injectable } from "@nestjs/common";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";
import { kMaxLength } from "buffer";
import { error } from "console";
import { flatMap } from "rxjs";
import { KeyCreationDto, KeyResponseDto, KeyUpdateDto } from "src/api/core/dtos";
import { AbsentKeyException } from "src/building-blocks/exception/no-key-found-exception";
import { RedisService } from "src/redis";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class KeyClient{
    constructor(private readonly redisService: RedisService) {}


    async getAllKeyDetails( ): Promise<any>{
        let keyResponseDto = new KeyResponseDto();
        let resp = await this.redisService.getAllHashKeys()
        return resp;
    }

    async deleteKey(id : string){
        let keyExists = await this.redisService.checkKeyExists(id);
        if (!keyExists){
            throw new AbsentKeyException(
                "Key not found",400
              );
        }

        let resp = await this.redisService.delete(id)
        return resp
    }


    async getKeyDetails(id :string ): Promise<KeyResponseDto>{
        let keyResponseDto = new KeyResponseDto();
        let keyExists = await this.redisService.checkKeyExists(id);
        if (!keyExists){
            throw new AbsentKeyException(
                "Key not found",400
              );
        }
        let resp = await this.redisService.getAllAccessKeyData(id)
        keyResponseDto.status = resp["status"]
        keyResponseDto.expirationTime = resp["expiration"]
        keyResponseDto.rateLimit = resp["rate_limit"]
        return keyResponseDto;
    }


    async createKey(payload : KeyCreationDto){

        const generatedKey = uuidv4();
        
        const resp = await this.redisService.setAccessKeyData(generatedKey,payload.rateLimit,payload.expirationTime,"Active","1")

        return payload;
    }


    async userAccessGetQuery(id : string){
        return await this.redisService.userAccessGetQuery("eb045a51-7902-420f-adb3-9b6a4c2fba96")
    }


    async updateKey(id: string, payload : KeyUpdateDto){

        let keyExists = await this.redisService.checkKeyExists(id);
        if (!keyExists){
            throw new AbsentKeyException(
                "Key not found",400
              );
        }
        let data: string[] = []; 
        console.log(payload)
        Object.entries(payload).forEach(([key , value]) => {
            if (key != "id"){
                data.push(key)
                data.push(value)
            }
          });
        return await this.redisService.update(id,data)
    }
}