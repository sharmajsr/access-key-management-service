// access-key-service/src/redis/redis.service.ts
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: Redis;

  async onModuleInit() {
    this.client = new Redis({
      host: process.env.REDIS_HOST || "localhost",
      port: parseInt(process.env.REDIS_PORT) || 6379,
    });
  }

  async onModuleDestroy() {
    await this.client.quit();
  }

  getClient(): Redis {
    return this.client;
  }

  async delete(accessKey: string): Promise<number> {
    const key = `key:${accessKey}`;
    return this.client.del(key);
  }

  async addRequestTimestamp(accessKey: string, timestamp: number): Promise<number> {
    const key = `key:${accessKey}:requests`;
    return await this.client.zadd(key, timestamp.toString(), timestamp.toString());
}

async countRequestsInRange(accessKey: string, startTimestamp: number, endTimestamp: number): Promise<number> {
    const key = `key:${accessKey}:requests`;
    return await this.client.zcount(key, startTimestamp.toString(), endTimestamp.toString());
}

async setAccessKeyData(accessKey: string, rateLimit: string, expiration: string, status: string, userId: string): Promise<number> {
  const key = `key:${accessKey}`;
  try {
      return await this.client.hset(
          key,
          'rate_limit', rateLimit,
          'expiration', expiration,
          'status', status,
          'user_id', userId
      );
  } catch (error) {
      console.error('Failed to set access key data:', error);
      throw new Error('Redis operation failed');
  }
}

async update(accessKey: string,payload : string[]): Promise<number> {
  const key = `key:${accessKey}`;
  console.log(key)
  try {
      return await this.client.hset(
          key,
          ...payload
      );
  } catch (error) {
      console.error('Failed to disable the key:', error);
      throw new Error('Redis operation failed');
  }
}

async getRateLimit(accessKey: string): Promise<string> {
    const key = `key:${accessKey}`;
    return await this.client.hget(key, 'rate_limit');
}

async  getAllHashKeys() {
  let cursor = '0';
  let keys = [];

  do {
      const reply = await this.client.scan(cursor, 'MATCH', '*');
      cursor = reply[0];
      const tmpKeys = reply[1];
      for (let key of tmpKeys) {
          const type = await this.client.type(key);
          if (type === 'hash') {
            
            let suffixKey = key.startsWith("key:") ? key.substring(4) : key
            
              keys.push(suffixKey);
          }
      }
  } while (cursor !== '0');

  return keys;
}

async checkKeyExists(accessKey:string) {
  const key = `key:${accessKey}`;
  const exists = await this.client.exists(key);
  return exists === 1;
}

async getAllAccessKeyData(accessKey: string): Promise<{[key: string]: string}> {
  const key = `key:${accessKey}`;
  console.log(key)
  try {
      const data = await this.client.hgetall(key);
      return data;
  } catch (error) {
      console.error('Failed to fetch access key data:', error);
      throw new Error('Redis operation failed');
  }
}

async userAccessGetQuery(accessKey : string): Promise<boolean>{

  const currentTimeInSeconds = Math.floor(Date.now() / 1000);
  const keyDetails = await this.getAllAccessKeyData(accessKey);
  

  const keyStatus = keyDetails["status"]
  const expiration = keyDetails["expiration"]
  if ( keyStatus != "Active") return false;

  if ( parseInt(expiration) < currentTimeInSeconds ) return false;


  const timeMinus60Seconds = currentTimeInSeconds - 60;
  const rateLimitOfUser = keyDetails["rate_limit"] 
  // console.log(`%s - %s `,currentTimeInSeconds,timeMinus60Seconds)
  const countRequestsInRange = await this.countRequestsInRange(accessKey,timeMinus60Seconds,currentTimeInSeconds)
  // console.log("Requwests in range ",countRequestsInRange)
  return parseInt(rateLimitOfUser) > countRequestsInRange;
}



}