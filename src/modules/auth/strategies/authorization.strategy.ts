import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { APIAccessKeyType } from 'src/common/enums/apiAccessKeyType';
import { AuthService } from '../auth.service';
@Injectable()
export class HeaderStrategy extends PassportStrategy(HeaderAPIKeyStrategy, 'access_api_server') {
    constructor(private authService: AuthService) {
        super({ header: 'Authorization', prefix: '' }, false, async (apiKey, done) => {
            const { valid, user } = await authService.validateAuthorizationKey(
                apiKey,
                APIAccessKeyType.ACCESS_APP_SERVER
            );
            if (!valid) return done(new UnauthorizedException());

            return done(null, user);
        });
    }

    async validate(payload: any) {
        return payload;
    }
}
