import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chat, ChatModel } from '../chat/schemas/chat.schema';
@Injectable()
export class WebsocketService {
    constructor(@InjectModel(Chat.name) private chatModel: ChatModel) {}

    async handshake(socketId: string) {
        console.log('handshake=======', socketId);
        // do something
    }

    async disconnect(socketId: string) {
        console.log('disconnect=======', socketId);
        // do something
    }

    async createMessage(chat: Chat) {
        console.log('chatMessage=======', chat);
        return await chat;
        //return await this.chatModel.create(chat);
    }
      
    async getMessages(): Promise<Chat[]> {
        return await this.chatModel.find();
    }
}
