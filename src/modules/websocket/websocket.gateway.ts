import { UsePipes, ValidationPipe } from '@nestjs/common';
import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
//import { WsResponseInterceptor } from 'src/common/interceptors/wsResponse.interceptor';
//import { ClientSDKApiKeyAuthGuard } from 'src/common/guards';
import { Server } from 'socket.io';
import { WebsocketService } from './websocket.service';
//import { AuthService } from '../auth/auth.service';

@UsePipes(new ValidationPipe())
//@UseInterceptors(new WsResponseInterceptor())
//@UseGuards(ClientSDKApiKeyAuthGuard)
@WebSocketGateway()
export class WebsocketGateway {
    @WebSocketServer() server: Server;

    constructor(private websocketService: WebsocketService) {}

    async connect(client: Socket) {
        const socketId = client.handshake.headers['socketId'] as string;

        if (socketId) {
            this.websocketService.handshake(socketId);
        }
    }

    async Disconnect(client: Socket) {
        const socketId = client.handshake.headers['socketId'] as string;
        if (socketId) {
            this.websocketService.disconnect(socketId);
        }
    }

    @SubscribeMessage('subscribe')
    async subscribeMessage(@MessageBody() body: any, @ConnectedSocket() client: Socket) {
        client.join(body.socketId);
        return 'success';
    }

    @SubscribeMessage('unsubscribe')
    async unsubscribeMessage(@MessageBody() body: any, @ConnectedSocket() client: Socket) {
        client.leave(body.socketId);
        return 'success';
    }
}
