import { Module } from '@nestjs/common';
import { ClientAuthMerchantModule } from './merchant/merchant.module';

const AuthClientModules = [ClientAuthMerchantModule];

@Module({
    imports: AuthClientModules,
    exports: AuthClientModules
})
export class ClientApiAuthModules {}
