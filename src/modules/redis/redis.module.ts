import { Module } from '@nestjs/common';
import { IRedisService } from './redis.service';

@Module({  
      controllers: [],
      providers: [IRedisService],
      exports: [IRedisService]
})
export class IRedisModule {}