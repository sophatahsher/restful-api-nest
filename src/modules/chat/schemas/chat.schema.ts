import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
   } from 'typeorm';

import { SoftDeleteModel } from 'mongoose-delete';
import * as mongooseDelete from 'mongoose-delete';
    
@Schema({ collection: 'merchants', timestamps: true })
export class Chat {
    @PrimaryGeneratedColumn('uuid')
    id: number;
    
    @Prop()
    email: string;
    
    @Prop({ unique: true })
    text: string;
    
    @Prop()
    createdAt: Date;
}

type ChatDocument = HydratedDocument<Chat>;
type ChatModel = SoftDeleteModel<ChatDocument>;
const ChatSchema = SchemaFactory.createForClass(Chat).plugin(mongooseDelete, { overrideMethods: true });
export { ChatDocument, ChatSchema, ChatModel}