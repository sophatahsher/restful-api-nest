import { createParamDecorator, ExecutionContext } from '@nestjs/common';
export const Auth = createParamDecorator((data: string, context: ExecutionContext) => {
    console.log('context==============', context);
    switch (context.getType()) {
        case 'http':
            const request = context.switchToHttp().getRequest();
            const response = request.user.merchant;
            return response;
        case 'ws':
            console.log('ws==============', context);
            const ws = context.switchToWs();
            return ws
    }
});
