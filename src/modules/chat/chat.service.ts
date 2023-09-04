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
const logger = new Logger('ChatService');

export class ChatService {
    constructor(
        //@InjectRepository(ChatMessage) private chatMessageModel: Repository<ChatMessageModel>,
        @InjectModel(ChatThread.name) private chatThreadModel: ChatThreadModel,
        @InjectModel(ChatRequest.name)
        private chatRequestModel: ChatRequestModel,
        @InjectModel(ChatMessage.name) private chatModel: ChatMessageModel,
        @InjectModel(ChatRequestHistory.name)
        private chatRequestHistoryModel: ChatRequestHistoryModel
    ) {}

    async createChatThreadRequest(request: any) {
        try {
            const createThreadRequest = await this.chatThreadModel.create(
                request
            );

            if (!createThreadRequest) {
                throw new HttpException(
                    {
                        status: Status.FAILED,
                        errorCode: ErrorCode.NOT_ACCEPTABLE,
                        errorMessage: ErrorMessage.INVALID_USERNAME
                    },
                    HttpStatus.NOT_FOUND
                );
            }
            //throw new HttpException({ errorCode: ErrorCode.INVALID_USERNAME, errorMessage: ErrorMessage.INVALID_USERNAME }, HttpStatus.NOT_FOUND);
            const createNewThreadRequest = await this.chatRequestModel.create({
                type: 'thread',
                threadId: createThreadRequest._id,
                status: true,
                expiredAt: new Date().setMonth(
                    LiveChatEnum.CHAT_REQUEST_EXPIRATION
                )
            });

            // Notify message to Agent/Merchant platform
            if (createNewThreadRequest) {
                console.log('Notify Step');
            }

            return 'success';
        } catch (error) {
            logger.log('Catch exception onCreateChatThreadRequest: ', error);
        }
    }

    async findChatThreadRequestById(id: any) {
        return {};
    }

    async deleteChatThreadRequest(id: any) {
        try {
            const record = await this.chatThreadModel.findOne({ _id: id });
            if (!record) {
                throw new HttpException(
                    {
                        status: Status.FAILED,
                        errorCode: ErrorCode.NOT_ACCEPTABLE,
                        errorMessage: ErrorMessage.INVALID_USERNAME
                    },
                    HttpStatus.NOT_FOUND
                );
            }

            const requestRecord = await this.chatRequestModel.findOne({
                threadId: record._id
            });
            if (requestRecord) {
                if (requestRecord.isAccepted)
                    throw new HttpException(
                        {
                            status: Status.FAILED,
                            errorCode: ErrorCode.NOT_ACCEPTABLE,
                            errorMessage:
                                'Could not delete this request. It is already accepted.'
                        },
                        HttpStatus.ACCEPTED
                    );

                // Copy data to RequestHistories
                const createRequestHistory = new this.chatRequestHistoryModel({
                    requestId: requestRecord._id,
                    senderId: null,
                    threadId: record._id,
                    recipientId: null,
                    roomId: null,
                    groupId: null,
                    isAccepted: requestRecord.isAccepted,
                    status: requestRecord.status,
                    requestedAt: requestRecord.createdAt,
                    expiredAt: requestRecord.expiredAt
                });

                await createRequestHistory.save();

                await requestRecord.delete();

                const delRequestThread = await record.delete();

                // Notify message to Agent/Merchant platform
                if (delRequestThread) {
                    console.log('Notify Step');
                } else {
                    throw new HttpException(
                        {
                            status: Status.FAILED,
                            errorCode: ErrorCode.NOT_ACCEPTABLE,
                            errorMessage:
                                'Could not delete this request. It is already accepted.'
                        },
                        HttpStatus.INTERNAL_SERVER_ERROR
                    );
                }
            }

            return 'success';
        } catch (error) {
            logger.log('Catch exception onDeleteChatThreadRequest: ', error);
            throw new HttpException(
                {
                    status: Status.FAILED,
                    errorCode: HttpStatus.INTERNAL_SERVER_ERROR,
                    errorMessage: ErrorMessage.SOMETHING_WENT_WRONG
                },
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    async createChatRequest(auth: any, payload: any) {
        console.log('Auth=======', auth);
        console.log('payload=======', payload);
        return await this.chatModel.create(payload);
    }

    // @Cron(CronExpression.EVERY_30_SECONDS)
    // handleCleanUpExpiredRequestCron() {
    //   logger.debug('Called every 30 seconds');
    // }

    async createMessage(chat: any) {
        return await this.chatModel.create(chat);
    }

    async getMessages() {
        return await this.chatModel.find();
    }
}
