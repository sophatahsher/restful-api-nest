import { Module } from '@nestjs/common';
import { AnonymousChatSdkModule } from './chat/anonymous-chat-sdk.module';

const AnonymousSkdModules = [AnonymousChatSdkModule];

@Module({
    imports: AnonymousSkdModules,
    exports: AnonymousSkdModules
})
export class AnonymousSDKModules {}
