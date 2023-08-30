import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { PUBLIC } from '../decorators/publicGuard.decorator';

@Injectable()
export class TokenAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        // const isAllowedAccess = this.reflector.getAllAndOverride<boolean>(PUBLIC, [
        //     context.getHandler(),
        //     context.getClass()
        // ]);
        console.log('context=======', context);
        //if (isAllowedAccess) return true;

        return super.canActivate(context);
    }

    handleRequest(err, user, info) {
        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        return user;
    }
}
