import { RedisService } from "@liaoliaots/nestjs-redis";
import { Inject, Injectable } from "@nestjs/common";
import Redis from 'ioredis';


@Injectable()
export class IRedisService  {

    private readonly redis: Redis;
    constructor(
        private readonly redisService: RedisService
        
    ) {
        this.redis = this.redisService.getClient();
    }

    async set(key: any, value: any, expiration: any) {
        await this.redis.set(key, value, 'EX', expiration);
    }

    async get(key: any) {
        return await this.redis.get(key);
    }
}