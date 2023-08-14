import { Controller, Render, Get, Res } from '@nestjs/common';
import { ChatService } from './chat.service';

import {
    MessageBody,
    WebSocketServer
} from '@nestjs/websockets';
import { Server } from  'socket.io';

import { ServerToClientEvents, ClientToServerEvents, Message } from './interfaces/chat.interface';
 
@Controller()
export class ChatGateway {

    @WebSocketServer() server: Server = new Server<
    ServerToClientEvents,
    ClientToServerEvents
  >();

    constructor(private readonly chatService: ChatService) {}
 
    async handleEvent( @MessageBody() payload: Message): Promise<Message> {
        console.log('onMessage: ', payload);
        this.server.emit('message', payload); // <--- ServerToClientEvent
        return payload;
    }
}