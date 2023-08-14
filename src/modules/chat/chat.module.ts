import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
//import { AuthModule } from '../auth/auth.module';
//import { Chat, ChatSchema } from '../chat/schemas/chat.schema';
import { WebsocketGateway } from '../websocket/websocket.gateway';

@Module({
    imports: [
        //MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
        //forwardRef(() => AuthModule),
    ],
    providers: [WebsocketGateway],
    exports: [WebsocketGateway]
})
export class LiveChatModule {}
