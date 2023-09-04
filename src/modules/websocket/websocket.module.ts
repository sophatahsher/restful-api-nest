import { Module, forwardRef } from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway';
import { WebsocketService } from './websocket.service';
import { MongooseModule } from '@nestjs/mongoose';
//import { AuthModule } from '../auth/auth.module';
import { ChatMessage, ChatMessageSchema } from '../chat/schemas/message.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: ChatMessage.name, schema: ChatMessageSchema }
        ])
        //forwardRef(() => AuthModule),
    ],
    providers: [WebsocketGateway, WebsocketService],
    exports: [WebsocketGateway, WebsocketService]
})
export class WebsocketModule {}
