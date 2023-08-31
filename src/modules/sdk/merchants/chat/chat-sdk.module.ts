import { Module } from '@nestjs/common';
import { LiveChatModule } from 'src/modules/chat/chat.module';
import { MerchantChatSdkController } from './chat-sdk.controller';
@Module({
    imports: [LiveChatModule],
    controllers: [MerchantChatSdkController]
})
export class MerchantChatSdkModule {}
