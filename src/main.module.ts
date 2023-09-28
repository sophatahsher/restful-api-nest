import {
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerMiddleware } from 'src/common/middleware/Logger.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { ClientApiAuthModules } from './modules/client-auth/client.module';
import { ScheduleModule } from '@nestjs/schedule';
import { WebsocketModule } from './modules/websocket/websocket.module';
import { UserMemberModule } from './modules/users/user.module';
import { IRedisModule } from './modules/redis/redis.module';

//import { RedisModule, RedisService } from 'nestjs-redis';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { NotificationModule } from './modules/notifications/notification.module';
import { LiveChatModule } from './modules/chat/chat.module';
import { MerchantSDKModules } from './modules/sdk/merchants/merchantSdk.module';
import { AnonymousSDKModules } from './modules/sdk/anonymous/AnonymousSdk.module';
import { ResumeModule } from './modules/resumes/resume.module';
import { CoverLetterModule } from './modules/coverletters/coverletter.module';
import { UploadFileModule } from './modules/uploads/upload.module';
import { SpokenLanguageModule } from './modules/spokenlangs/spokenlang.module';
//import { redisConfig } from './modules/redis/redis-client.factory';

const EnvironmentModule = ConfigModule.forRoot({ isGlobal: true });
const MongoDBModule = MongooseModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URL')
    })
});

// Redis
const RedisDBModule = RedisModule.forRoot({
    config: {
        host: 'localhost',
        port: 6379,
        password: ''
    }
});

@Module({
    imports: [
        EnvironmentModule,
        MongoDBModule,
        RedisDBModule,
        ScheduleModule.forRoot(),
        AuthModule,
        UserMemberModule,
        ClientApiAuthModules,
        WebsocketModule,
        IRedisModule,
        NotificationModule,
        LiveChatModule,
        //
        MerchantSDKModules,
        //
        AnonymousSDKModules,
        //
        ResumeModule,
        //
        CoverLetterModule,
        //
        UploadFileModule,
        //
        SpokenLanguageModule
    ]
})
export class MainModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
