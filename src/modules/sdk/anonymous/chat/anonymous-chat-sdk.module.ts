import { Module } from '@nestjs/common';
import { LiveChatModule } from 'src/modules/chat/chat.module';
import { AnonymousChatSdkController } from './anonymous-chat-sdk.controller';
@Module({
    imports: [LiveChatModule],
    controllers: [AnonymousChatSdkController]
})
export class AnonymousChatSdkModule {}
