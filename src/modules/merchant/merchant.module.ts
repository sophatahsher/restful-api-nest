import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandModule } from 'nestjs-command';
import { Merchant, MerchantSchema } from './schemas/merchant.schema';
import { MerchantService } from './merchant.service';
import { MerchantController } from './merchant.controller';
//import { WebsocketModule } from '../websocket/websocket.module';

const DBSchemaModule = MongooseModule.forFeature([{ name: Merchant.name, schema: MerchantSchema }]);

@Module({
    imports: [DBSchemaModule, CommandModule],
    controllers: [MerchantController],
    providers: [MerchantService],
    exports: [MerchantService]
})
export class MerchantModule {}
