import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { APIAccessKeyType } from 'src/common/enums/apiAccessKeyType';
import { AuthService } from 'src/modules/auth/auth.service';
import { ErrorCode, ErrorMessage } from 'src/common/enums/responseMessage';
@Injectable()
export class ClientApiKeyStrategy extends PassportStrategy(
    HeaderAPIKeyStrategy,
    'client_api_key'
) {
    constructor(private authService: AuthService) {
        super(
            { header: 'Authorization', prefix: '' },
            false,
            async (apiKey, done) => {
                const { valid, merchant } =
                    await authService.validateAuthorizationKey(
                        apiKey,
                        APIAccessKeyType.ACCESS_APP_CLIENT
                    );

                if (!valid) return done(new UnauthorizedException());

                if (!merchant) return done(new UnauthorizedException('ABC'));

                if (!merchant.status)
                    return done(
                        new UnauthorizedException(ErrorMessage.ACCOUNT_DISABLED)
                    );

                return done(null, merchant);
            }
        );
    }

    async validate(payload: any) {
        return payload;
    }
}
