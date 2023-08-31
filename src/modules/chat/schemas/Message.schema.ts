import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Mixed } from 'mongoose';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
   } from 'typeorm';

import { SoftDeleteModel } from 'mongoose-delete';
import * as mongooseDelete from 'mongoose-delete';
    
@Schema({ collection: 'chat_messages', timestamps: true })
export class ChatMessage {
    @PrimaryGeneratedColumn('uuid')
    id: number;
    
    @Prop()
    userId: string; // Message Owner

    @Prop()
    roomId: string;

    @Prop()
    groupId: string;

    @Prop()
    threadId: string;

    @Prop()
    replyId: string; // replyToMessageId

    @Prop()
    messageType: string;

    @Prop()
    mimeType: string;

    @Prop()
    message: string;

    @Prop()
    attachments: string;

    @Prop({ type: Object})
    attachmentDetails: any;

    @Prop({ unique: false })
    isPinned: boolean;

    @Prop({ unique: false })
    isArchived: boolean;
    
    @Prop()
    createdAt: Date;
}

type ChatMessageDocument = HydratedDocument<ChatMessage>;
type ChatMessageModel = SoftDeleteModel<ChatMessageDocument>;
const ChatMessageSchema = SchemaFactory.createForClass(ChatMessage).plugin(mongooseDelete, { overrideMethods: true });
export { ChatMessageDocument, ChatMessageSchema, ChatMessageModel}