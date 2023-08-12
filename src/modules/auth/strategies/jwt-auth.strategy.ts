import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as moment from 'moment';
import { MerchantService } from 'src/modules/merchant/merchant.service';
import { ResponseMessage } from 'src/common/enums/responseMessage';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
    constructor(private config: ConfigService, private merchantService: MerchantService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get('JWT_SECRET')
        });
    }

    async validate(payload: any) {
        const isExpired = moment().isAfter(moment(payload.exp));
        if (isExpired) throw new UnauthorizedException();
        const merchant = await this.merchantService.findOne(payload.merchant._id);

        //
        if (!merchant.status)
            throw new UnauthorizedException(ResponseMessage.DISABLED);

        return payload;
    }
}
