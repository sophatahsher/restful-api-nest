import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as moment from 'moment';
import { UserService } from 'src/modules/users/user.service';
import { ErrorCode, ErrorMessage } from 'src/common/enums/responseMessage';
@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy) {
    constructor(
        private config: ConfigService,
        private userService: UserService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get('JWT_SECRET')
        });
    }

    async validate(payload: any) {
        const isExpired = moment().isAfter(moment(payload.exp));
        if (isExpired) throw new UnauthorizedException();
        const user = await this.userService.findOne(payload.auth._id);
        //
        if (!user.status)
            throw new UnauthorizedException(ErrorMessage.ACCOUNT_DISABLED);

        return payload;
    }
}
