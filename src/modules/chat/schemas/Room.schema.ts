import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn
} from 'typeorm';

import { SoftDeleteModel } from 'mongoose-delete';
import * as mongooseDelete from 'mongoose-delete';

@Schema({ collection: 'chat_rooms', timestamps: true })
export class ConversationRoom {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Prop()
    roomId: string;

    @Prop({ default: true })
    status: boolean;

    @Prop({ default: false })
    isBlocked: boolean;

    @Prop()
    createdAt: Date;
}

type ConversationRoomDocument = HydratedDocument<ConversationRoom>;
type ConversationRoomModel = SoftDeleteModel<ConversationRoomDocument>;
const ConversationRoomSchema = SchemaFactory.createForClass(
    ConversationRoom
).plugin(mongooseDelete, { overrideMethods: true });
export {
    ConversationRoomDocument,
    ConversationRoomSchema,
    ConversationRoomModel
};
