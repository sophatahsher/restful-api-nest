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
    type: string;

    @Prop()
    senderId: string;

    @Prop()
    receiverId: string;

    @Prop()
    roomId: string;

    @Prop()
    groupId: string;
    
    @Prop({ default: false })
    isAccepted: boolean;

    @Prop()
    status: Date;

    @Prop()
    createdAt: Date;

    @Prop()
    expiredAt: Date;
}

type ChatRequestDocument = HydratedDocument<ChatRequest>;
type ChatRequestModel = SoftDeleteModel<ChatRequestDocument>;
const ChatRequestSchema = SchemaFactory.createForClass(ChatRequest).plugin(mongooseDelete, { overrideMethods: true });
export { ChatRequestDocument, ChatRequestSchema, ChatRequestModel}