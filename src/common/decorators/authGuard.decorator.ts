import { createParamDecorator, ExecutionContext } from '@nestjs/common';
export const Auth = createParamDecorator((data: string, context: ExecutionContext) => {
        switch (context.getType()) {
            case 'http':
                const request = context.switchToHttp().getRequest();
                const response = request.user.auth;
                return response;
            case 'ws':
                const ws = context.switchToWs();
                return ws;
        }
    }
);
