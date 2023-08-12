import { Module, forwardRef } from '@nestjs/common';
import { MerchantModule } from 'src/modules/merchant/merchant.module';
import { ClientAuthMerchantController } from './merchant.controller';
//import { WebsocketModule } from '../websocket/websocket.module';


@Module({
    imports: [MerchantModule],
    controllers: [ClientAuthMerchantController],
})
export class ClientAuthMerchantModule {}
