import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { APIAccessKeyType } from 'src/common/enums/apiAccessKeyType';
import { AuthService } from 'src/modules/auth/auth.service';
import { ResponseMessage } from 'src/common/enums/responseMessage';
@Injectable()
export class ClientApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy,'client_api_key') {
    constructor(private authService: AuthService) {
        super({ header: 'Authorization', prefix: '' }, false, async (apiKey, done) => {
            const { valid, user } = await authService.checkAuthorizationKey(
                apiKey,
                APIAccessKeyType.ACCESS_APP_CLIENT
            ); 
            
            if (!valid) return done(new UnauthorizedException());

            if (!user) return done(new UnauthorizedException('ABC'));

            if (!user.status)
                return done(new UnauthorizedException(ResponseMessage.DISABLED));

            return done(null, user);
        });
    }

    async validate(payload: any) {
        return payload;
    }
}
