import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WebsocketGateway } from '../websocket/websocket.gateway';
import { ChatController } from './chat.controller';
import { ChatMessage, ChatMessageSchema } from './schemas/message.schema';
import { AuthModule } from '../auth/auth.module';
import { ChatService } from './chat.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: ChatMessage.name, schema: ChatMessageSchema }]),
        forwardRef(() => AuthModule),
    ],
    controllers: [ChatController],
    providers: [ChatService],
    exports: [ChatService]
})
export class LiveChatModule {}
