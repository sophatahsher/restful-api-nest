import { FindRequestChatQueryDto } from './dto/FindChatRequests.dto';
import {
    BadRequestException,
    HttpException,
    HttpStatus,
    Injectable,
    Logger
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { ChatMessage, ChatMessageModel } from './schemas/message.schema';
import { ChatThread, ChatThreadModel } from './schemas/Threads.schema';
import { ChatRequest, ChatRequestModel } from './schemas/Request.schema';
import { Cron, CronExpression } from '@nestjs/schedule';
import { LiveChatEnum } from 'src/common/enums/chat.enum';
import {
    ErrorCode,
    ErrorMessage,
    Status
} from 'src/common/enums/responseMessage';
import {
    ChatRequestHistory,
    ChatRequestHistoryModel
} from './schemas/RequestHistory.schema';
//const logger = new Logger('ChatService');

export class RequestChatService {
    constructor(
        @InjectModel(ChatThread.name) private chatThreadModel: ChatThreadModel,
        @InjectModel(ChatRequest.name)
        private chatRequestModel: ChatRequestModel,
        @InjectModel(ChatMessage.name) private chatModel: ChatMessageModel,
        @InjectModel(ChatRequestHistory.name)
        private chatRequestHistoryModel: ChatRequestHistoryModel
    ) {}

    async findAllChatRequests(auth: any, qry: FindRequestChatQueryDto, pagination: any) {
        const records = await this.chatRequestModel.find()
        .skip(pagination.offset)
        .limit(pagination.limit)
        .sort({ createdAt: -1 });
        const totalRecords = await this.chatRequestModel.countDocuments();
        return { data: records, totalRecords: totalRecords };
    }
}
