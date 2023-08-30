
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatMessage, ChatMessageModel } from './schemas/message.schema';
import { InjectModel } from '@nestjs/mongoose';
 
@Injectable()
export class ChatService {
    constructor(
        //@InjectRepository(ChatMessage) private chatMessageModel: Repository<ChatMessageModel>,
        @InjectModel(ChatMessage.name) private chatModel: ChatMessageModel,
    ) {}

    async createChatRequest(auth: any, payload: any) {
      console.log('Auth=======', auth);
      console.log('payload=======', payload);
        return await this.chatModel.create(payload);
    }

  async createMessage(chat: any) {
    return await this.chatModel.create(chat);
  }
 
  async getMessages() {
      return await this.chatModel.find();
  }
}