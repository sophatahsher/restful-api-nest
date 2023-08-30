// import { FactoryProvider } from '@nestjs/common';
// import { createClient } from 'redis';
// import { RedisClient, REDIS_CLIENT } from './redis.constants';

import { RedisModuleOptions } from "nestjs-redis"

// export const redisClientFactory: FactoryProvider<Promise<RedisClient>> = {
//     provide: REDIS_CLIENT,
//     useFactory: async () => {
//     const client = createClient({ url: 'redis://localhost:6379/0' });
//     await client.connect();
//     return client;
//     },
// };

export const redisConfig: RedisModuleOptions = {
    name: 'redis',
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
    db: parseInt(process.env.REDIS_DB),
    password: process.env.REDIS_PASSWORD,
    keyPrefix: process.env.REDIS_PRIFIX,
}

