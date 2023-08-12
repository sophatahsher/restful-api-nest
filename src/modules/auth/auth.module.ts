import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorizationKey, AuthorizationKeySchema } from './schemas/authorization.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthStrategy } from './strategies/jwt-auth.strategy';
import { HeaderStrategy } from './strategies/authorization.strategy';
import { MerchantModule } from '../merchant/merchant.module';
import { ClientApiKeyStrategy } from './strategies/client-api-key.strategy';

const JwtModuleRegistered = JwtModule.registerAsync({
    useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET')
    }),
    inject: [ConfigService]
});

const DBSchemaModule = MongooseModule.forFeature([
    { name: AuthorizationKey.name, schema: AuthorizationKeySchema }
]);

@Module({
    imports: [DBSchemaModule, JwtModuleRegistered, MerchantModule],
    exports: [AuthService, DBSchemaModule],
    controllers: [AuthController],
    providers: [
        AuthService,
        ConfigService,
        JwtAuthStrategy,
        HeaderStrategy,
        ClientApiKeyStrategy
    ]
})
export class AuthModule {}
