import {
    UseGuards,
    UseInterceptors,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { WebsocketResponseInterceptor } from 'src/common/interceptors/websocketResponse';
import { ClientAuthGuard } from 'src/common/guards/client-auth.guard';
import { Server } from 'socket.io';
//import { Chat } from '../chat/schemas/chat.schema';
import { WebsocketService } from './websocket.service';
//import { AuthService } from '../auth/auth.service';
//@UsePipes(new ValidationPipe())
//@UseGuards(ClientAuthGuard)
//@UseInterceptors(new WebsocketResponseInterceptor())
@WebSocketGateway({
    namespace: '/api/v1/ws',
    path: '/api/v1/ws/socket.io',
    pingInterval: 15000,
    pingTimeout: 10000
})
//@WebSocketGateway(8001) // Using WebSocketAdapter can be using with custom application running port
export class WebsocketGateway {
    @WebSocketServer() server: Server;
    users: number = 0;
    constructor(private websocketService: WebsocketService) {}

    @SubscribeMessage('sendMessage')
    async handleSendMessage(client: Socket, payload: any): Promise<void> {
        //console.log('payload=======', payload);
        await this.websocketService.createMessage(payload);
        this.server.emit('sendMessage', { status: 'success' });
    }

    afterInit(server: Server) {
        console.log(`afterInit : ${server}`);
        //Do stuffs
    }

    async handleConnection(client: Socket, ...args: any[]) {
        try {
            // A client has connected
            this.users++;
            console.log(`users ${this.users}`);
            console.log(`Connected ${client.id}`);

            // Notify connected clients of current users
            this.server.emit('users', this.users);

            //const socketId = client.handshake.headers['socketId'] as string;
            //console.log('client.handshake==========', client.handshake);
            //if (socketId) {
            //    this.websocketService.handshake(socketId);
            //}
            return 'hello';
        } catch (e) {
            console.log('client.handshake==========', e);
        }
    }

    async handleDisconnect(client: Socket) {
        // A client has disconnected
        this.users--;
        console.log(`Disconnected: ${client.id}`);
        // Notify connected clients of current users
        this.server.emit('users', this.users);

        //Do stuffs
        // const socketId = client.handshake.headers['socketId'] as string;
        // if (socketId) {
        //     this.websocketService.disconnect(socketId);
        // }
    }

    @SubscribeMessage('subscribe')
    async subscribeMessage(
        @MessageBody() body: any,
        @ConnectedSocket() client: Socket
    ) {
        client.join(body.socketId);
        return 'success';
    }

    @SubscribeMessage('unsubscribe')
    async unsubscribeMessage(
        @MessageBody() body: any,
        @ConnectedSocket() client: Socket
    ) {
        client.leave(body.socketId);
        return 'success';
    }
}
