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
    
@Schema({ collection: 'chat_requests', timestamps: true })
export class ChatRequest {
    @PrimaryGeneratedColumn('uuid')
    id: number;
    
    @Prop()
    type: string; // thread, friend, private_chat, group

    @Prop({ default: null })
    senderId: string;

    @Prop({ default: null })
    threadId: string;

    @Prop({ default: null })
    recipientId: string;

    @Prop({ default: null })
    roomId: string; // request join a room

    @Prop({ default: null })
    groupId: string; // request join a group
    
    @Prop({ default: false })
    isAccepted: boolean;

    @Prop({ default: false })
    status: boolean;

    @Prop()
    createdAt: Date;

    @Prop()
    expiredAt: Date;
}

type ChatRequestDocument = HydratedDocument<ChatRequest>;
type ChatRequestModel = SoftDeleteModel<ChatRequestDocument>;
const ChatRequestSchema = SchemaFactory.createForClass(ChatRequest).plugin(mongooseDelete, { overrideMethods: true });
export { ChatRequestDocument, ChatRequestSchema, ChatRequestModel}