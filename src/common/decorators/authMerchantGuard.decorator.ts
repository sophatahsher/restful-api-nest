import { createParamDecorator, ExecutionContext } from '@nestjs/common';
export const MerchantAuth = createParamDecorator((data: string, context: ExecutionContext) => {
    switch (context.getType()) {
        case 'http':
            const request = context.switchToHttp().getRequest();
            const response = request.user.merchant;
            return response;
        case 'ws':
            const ws = context.switchToWs();
            return ws
    }
});
