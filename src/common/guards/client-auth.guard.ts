import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class ClientAuthGuard extends AuthGuard('client_api_key') {
    canActivate(context: ExecutionContext) {
        let apiKey: any = null;
        switch (context.getType()) {
            case 'http':
                apiKey = context.switchToHttp().getRequest<Request>().headers['authorization'];
                break;
            case 'ws':
                apiKey = context.switchToWs().getClient().handshake?.headers?.authorization;
                break;
        }
        if (!apiKey) throw new UnauthorizedException('Unauthorized');
        return super.canActivate(context);
    }

    getRequest(context: ExecutionContext) {
        switch (context.getType()) {
            case 'http':
                return context.switchToHttp().getRequest<Request>();
            case 'ws':
                return {
                    headers: {
                        authorization: context.switchToWs().getClient().handshake?.headers?.authorization 
                    }
                };
        }
    }

    handleRequest(err, user) {
        if (err) throw err;
        return { merchant: user } as any;
    }
}
