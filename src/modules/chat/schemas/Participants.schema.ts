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

@Schema({ collection: 'chat_participants', timestamps: true })
// Room Members
export class ChatParticipants {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Prop()
    userId: string; // ParticipantId

    @Prop()
    threadId: string; // Thread

    @Prop()
    roomId: string;

    @Prop()
    groupId: string;

    @Prop()
    messageType: string;

    @Prop()
    mimeType: string;

    @Prop()
    lastMessage: string;

    @Prop()
    lastAttachments: string;

    @Prop({ type: Object })
    lastAttachmentDetails: any;

    @Prop()
    lastReadAt: Date;

    @Prop({ unique: false })
    muted: boolean;

    @Prop({ unique: false })
    onlineStatus: boolean;

    @Prop()
    createdAt: Date;
}

type ChatParticipantsDocument = HydratedDocument<ChatParticipants>;
type ChatParticipantsModel = SoftDeleteModel<ChatParticipantsDocument>;
const ChatParticipantsSchema = SchemaFactory.createForClass(
    ChatParticipants
).plugin(mongooseDelete, { overrideMethods: true });
export {
    ChatParticipantsDocument,
    ChatParticipantsSchema,
    ChatParticipantsModel
};
