import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MerchantService } from 'src/modules/merchant/merchant.service';
import * as bcrypt from 'bcrypt';
import * as moment from 'moment';
import { encrypt, hashStringWithSalt } from 'src/common/utils/encryption';
import { InjectModel } from '@nestjs/mongoose';
import { AuthorizationKey, AuthorizationKeyModel } from './schemas/authorization.schema';
import { APIAccessKeyType } from 'src/common/enums/apiAccessKeyType';
import { ResponseErrorMessage, ResponseMessage } from 'src/common/enums/responseMessage';
import { ChangePasswordBodyDto } from './dto/change-password';

@Injectable()
export class AuthService {
    constructor(
        private merchantService: MerchantService,
        private jwtService: JwtService,
        @InjectModel(AuthorizationKey.name) private authorizationKeyModel: AuthorizationKeyModel
    ) {}

    async loginUser({ username, password }: any) {
        const merchant = await this.merchantService.findBy({ username });

        if (!merchant) throw new UnauthorizedException('Username is incorrect.');

        if (!bcrypt.compareSync(password, merchant.password))
            throw new UnauthorizedException('Password is incorrect.');

        const merchantObj = merchant.toObject();
        delete merchantObj.password;

        const payload = {
            merchant: merchantObj,
            sub: merchantObj._id,
            iat: moment().valueOf(),
            exp: moment().add(1, 'days').valueOf()
        };

        const accessToken = this.jwtService.sign(payload, {});

        return {
            merchant: merchantObj,
            accessToken
        };
    }

    async changeUserPassword(userId: string, body: ChangePasswordBodyDto) {
        const merchant = await this.merchantService.findOne(userId);
        const isMatchedCurrentPassword = bcrypt.compareSync(body.currentPassword, merchant.password);
        if (!isMatchedCurrentPassword)
            throw new BadRequestException(ResponseErrorMessage.oldPasswordDoestNotMatched);

        const newPasswordHash = hashStringWithSalt(body.newPassword, 10);
        merchant.password = newPasswordHash;
        await merchant.save();

        return 'success';
    }

    async checkAuthorizationKey(headerKey: string, type: APIAccessKeyType) {
        const hash= encrypt(headerKey, 'sha256');
        const record = await this.authorizationKeyModel
            .findOne({ key: hash, type: type })
            .populate('merchant');

        if (!record) return { valid: false, user: null };

        return { valid: true, user: record.merchant };
    }
}
