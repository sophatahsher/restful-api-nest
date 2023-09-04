import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Mixed } from 'mongoose';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn
} from 'typeorm';

import { SoftDeleteModel } from 'mongoose-delete';
import * as mongooseDelete from 'mongoose-delete';

@Schema({ collection: 'chat_request_histories', timestamps: true })
export class ChatRequestHistory {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Prop()
    requestId: string;

    @Prop({ default: null })
    senderId: string;

    @Prop({ default: null })
    threadId: string;

    @Prop({ default: null })
    recipientId: string;

    @Prop()
    roomId: string;

    @Prop()
    groupId: string;

    @Prop({ default: false })
    isAccepted: boolean;

    @Prop()
    status: boolean;

    @Prop()
    requestedAt: Date;

    @Prop()
    expiredAt: Date;
}

type ChatRequestHistoryDocument = HydratedDocument<ChatRequestHistory>;
type ChatRequestHistoryModel = SoftDeleteModel<ChatRequestHistoryDocument>;
const ChatRequestHistorySchema = SchemaFactory.createForClass(
    ChatRequestHistory
).plugin(mongooseDelete, { overrideMethods: true });
export {
    ChatRequestHistoryDocument,
    ChatRequestHistorySchema,
    ChatRequestHistoryModel
};
