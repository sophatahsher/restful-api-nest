import { Module, forwardRef } from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway';
import { WebsocketService } from './websocket.service';
//import { AuthModule } from '../auth/auth.module';
@Module({
    imports: [
        //forwardRef(() => AuthModule),
    ],
    providers: [WebsocketGateway, WebsocketService],
    exports: [WebsocketGateway, WebsocketService]
})
export class WebsocketModule {}
