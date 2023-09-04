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

@Schema({ collection: 'chat_threads', timestamps: true })
export class ChatThread {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Prop()
    categoryId: string;

    @Prop()
    subject: string;

    @Prop()
    createdAt: Date;

    @Prop()
    deletedAt: Date;
}

type ChatThreadDocument = HydratedDocument<ChatThread>;
type ChatThreadModel = SoftDeleteModel<ChatThreadDocument>;
const ChatThreadSchema = SchemaFactory.createForClass(ChatThread).plugin(
    mongooseDelete,
    { overrideMethods: true }
);
export { ChatThreadDocument, ChatThreadSchema, ChatThreadModel };
