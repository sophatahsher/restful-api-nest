import { Module } from '@nestjs/common';
import { MerchantChatSdkModule } from './chat/chat-sdk.module';

const merchantSkdModules = [
    MerchantChatSdkModule
];

@Module({
    imports: merchantSkdModules,
    exports: merchantSkdModules
})
export class MerchantSDKModules {}
