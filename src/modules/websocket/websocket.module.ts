import { Module, forwardRef } from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway';
import { WebsocketService } from './websocket.service';
import { MongooseModule } from '@nestjs/mongoose';
//import { AuthModule } from '../auth/auth.module';
import { Chat, ChatSchema } from '../chat/schemas/chat.schema';
@Module({
    imports: [
        MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
        //forwardRef(() => AuthModule),
    ],
    providers: [WebsocketGateway, WebsocketService],
    exports: [WebsocketGateway, WebsocketService]
})
export class WebsocketModule {}
