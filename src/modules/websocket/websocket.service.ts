import { Injectable } from '@nestjs/common';
@Injectable()
export class WebsocketService {
    constructor() {}

    async handshake(socketId: string) {
        // do something
    }

    async disconnect(socketId: string) {
        // do something
    }
}
