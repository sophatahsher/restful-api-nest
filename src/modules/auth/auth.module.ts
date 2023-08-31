import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorizationKey, AuthorizationKeySchema } from './schemas/authorization.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessTokenStrategy } from './strategies/auth.strategy';
import { RefreshTokenStrategy } from './strategies/jwt-refresh-token.strategy';
//import { HeaderStrategy } from './strategies/authorization.strategy';
import { MerchantModule } from '../merchant/merchant.module';
import { UserModule } from './../users/user.module';
import { ClientApiKeyStrategy } from './strategies/client-api-key.strategy';
import { IRedisModule } from '../redis/redis.module';
import { IRedisService } from '../redis/redis.service';
import { MerchantApiKeyStrategy } from './strategies/merchant-api-key.strategy';

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
    imports: [
        DBSchemaModule, 
        JwtModuleRegistered, 
        MerchantModule, 
        UserModule,
        IRedisModule
    ],
    exports: [AuthService, DBSchemaModule],
    controllers: [AuthController],
    providers: [
        AuthService,
        AccessTokenStrategy,
        RefreshTokenStrategy,
        ConfigService,
        //HeaderStrategy,
        ClientApiKeyStrategy,
        MerchantApiKeyStrategy,
        IRedisService
    ]
})
export class AuthModule {}
