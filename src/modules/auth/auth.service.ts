import {
    BadRequestException,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MerchantService } from 'src/modules/merchant/merchant.service';
import * as bcrypt from 'bcrypt';
import * as moment from 'moment';
import { encrypt, hashStringWithSalt } from 'src/common/utils/encryption';
import { InjectModel } from '@nestjs/mongoose';
import {
    AuthorizationKey,
    AuthorizationKeyModel
} from './schemas/authorization.schema';
import { APIAccessKeyType } from 'src/common/enums/apiAccessKeyType';
import {
    Message,
    ErrorMessage,
    ErrorCode,
    AppUserMessage
} from 'src/common/enums/responseMessage';
import { ChangePasswordBodyDto } from './dto/change-password';
import { UserService } from '../users/user.service';
import { IRedisService } from '../redis/redis.service';
import { UserStatus } from '../users/enums/status.enum';
//import { DemoRedisService } from '../redis/redis.service';

@Injectable()
export class AuthService {
    constructor(
        private merchantService: MerchantService,
        private userService: UserService,
        private jwtService: JwtService,
        //private redisClient: IRedisService,
        @InjectModel(AuthorizationKey.name)
        private authorizationKeyModel: AuthorizationKeyModel
    ) {}

    async loginUser({ username, password }: any) {
        const user = await this.userService.findByUsername(username);
        if (!user) 
            throw new HttpException(
                {
                    errorCode: ErrorCode.INVALID_USERNAME,
                    errorMessage: ErrorMessage.INVALID_USERNAME
                },
                HttpStatus.NOT_FOUND
            );

        if (!bcrypt.compareSync(password, user.password))
            throw new HttpException(
                {
                    errorCode: ErrorCode.INVALID_USERNAME,
                    errorMessage: ErrorMessage.INVALID_USERNAME
                },
                HttpStatus.UNAUTHORIZED
            );
        
        // check UserStatus
        if ( user.status !== UserStatus.ACTIVE )
            this.getAppUserStatus(user.status)

        const userObj = user.toObject();
        delete userObj.password;
        const payload = {
            auth: userObj,
            sub: userObj._id,
            iat: moment().valueOf(),
            exp: moment().add(1, 'days').valueOf()
        };

        const accessToken = this.jwtService.sign(payload, {});

        // RedisStore
        //this.redisClient.set('access_token', accessToken, 500);
        //const redisSessionUser = await this.redisClient.get('access_token');
        return {
            accessToken: accessToken
        };
    }
    /*
    async loginUser({ username, password }: any) {
        const merchant = await this.merchantService.findBy({ username });

        if (!merchant) throw new HttpException('Username is incorrect.', HttpStatus.NOT_FOUND);

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
            //merchant: merchantObj,
            //refreshToken,
            accessToken
        };
    }
    */
    async changeUserPassword(userId: string, body: ChangePasswordBodyDto) {
        const merchant = await this.merchantService.findOne(userId);
        const isMatchedCurrentPassword = bcrypt.compareSync(
            body.currentPassword,
            merchant.password
        );
        if (!isMatchedCurrentPassword)
            throw new HttpException(
                {
                    errorCode: ErrorCode.OLD_PASSWORD_NOT_MATCH,
                    errorMessage: ErrorMessage.OLD_PASSWORD_NOT_MATCH
                },
                HttpStatus.BAD_REQUEST
            );

        const newPasswordHash = hashStringWithSalt(body.newPassword, 10);
        merchant.password = newPasswordHash;
        await merchant.save();

        return 'success';
    }

    async validateAuthorization(headerKey: string, type: APIAccessKeyType) {
        const hash = encrypt(headerKey, 'sha256');
        const record = await this.authorizationKeyModel
            .findOne({ key: hash, type: type })
            .populate('merchant');
        if (!record) return { valid: false, user: null };
        return { valid: true, auth: record.merchant }; 
    }

    async validateAuthorizationKey(headerKey: string, type: APIAccessKeyType) {
        const hash = encrypt(headerKey, 'sha256');
        const record = await this.authorizationKeyModel
            .findOne({ key: hash, type: type })
            .populate('merchant');
        if (!record) return { valid: false, user: null };
        return { valid: true, merchant: record.merchant }; //return { valid: true, merchant: record.merchant };
    }

    private getAppUserStatus(statusNum: number) {
        switch(statusNum) {
            case 1 :
                return AppUserMessage.USER_IS_ACTIVE;
            break;
            case 2 :
                return AppUserMessage.USER_IS_SUSPENDED;
            break;
            case 3 :
                return AppUserMessage.USER_IS_BANNED;
            break;
            case 4 :
                return AppUserMessage.USER_IS_CLOSED;
            break;
            default: 
                return AppUserMessage.USER_IS_DISABLED;
        }
    }
}
