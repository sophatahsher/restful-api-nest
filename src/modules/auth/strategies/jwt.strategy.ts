import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as moment from 'moment';
import { UserMemberService } from 'src/modules/users/user.service';
import { AppUserMessage, ErrorCode, ErrorMessage } from 'src/common/enums/responseMessage';
import { UserStatus } from 'src/modules/users/enums/status.enum';
@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy) {
    constructor(
        private config: ConfigService,
        private userService: UserMemberService
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
        if (!user && user.status !== UserStatus.ACTIVE ) {
            throw new UnauthorizedException(this.getUserStatus(user.status));
        }
            
        return payload;
    }

    getUserStatus(enumStatus:number) {
        
        let status = null;

        switch(enumStatus) {
            case 2 :
                status = AppUserMessage.USER_IS_SUSPENDED;
            break;
            case 3 :
                status = AppUserMessage.USER_IS_BANNED;
            break;
            case 4 :
                status = AppUserMessage.USER_IS_CLOSED;
            break;
            default: 
                status = AppUserMessage.USER_IS_DISABLED;
        }

        return status;
    }
}
