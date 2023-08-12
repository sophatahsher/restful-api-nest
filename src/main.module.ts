import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerMiddleware } from 'src/common/middleware/Logger.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { ClientApiAuthModules } from './modules/client-auth/client.module';
import { ScheduleModule } from '@nestjs/schedule';
import { WebsocketModule } from './modules/websocket/websocket.module';

const EnvironmentModule = ConfigModule.forRoot({ isGlobal: true });
const MongoDBModule = MongooseModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URL')
    })
});

@Module({
    imports: [
        EnvironmentModule,
        MongoDBModule,
        ScheduleModule.forRoot(),
        AuthModule,
        ClientApiAuthModules,
        WebsocketModule
    ]
})
export class MainModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}