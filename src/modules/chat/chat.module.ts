import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WebsocketGateway } from '../websocket/websocket.gateway';
import { ChatController } from './chat.controller';
import { ChatMessage, ChatMessageSchema } from './schemas/message.schema';
import { ChatThread, ChatThreadSchema } from './schemas/Threads.schema';
import { ChatRequest, ChatRequestSchema } from './schemas/Request.schema';
import {
    ChatRequestHistory,
    ChatRequestHistorySchema
} from './schemas/RequestHistory.schema';
import { AuthModule } from '../auth/auth.module';
import { ChatService } from './chat.service';
import { RequestChatService } from './request.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: ChatMessage.name, schema: ChatMessageSchema }
        ]),
        MongooseModule.forFeature([
            { name: ChatThread.name, schema: ChatThreadSchema }
        ]),
        MongooseModule.forFeature([
            { name: ChatRequest.name, schema: ChatRequestSchema }
        ]),
        MongooseModule.forFeature([
            { name: ChatRequestHistory.name, schema: ChatRequestHistorySchema }
        ]),
        forwardRef(() => AuthModule)
    ],
    controllers: [ChatController],
    providers: [ChatService, RequestChatService],
    exports: [ChatService, RequestChatService]
})
export class LiveChatModule {}
