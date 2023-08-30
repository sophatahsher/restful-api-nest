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
    
@Schema({ collection: 'chat_groups', timestamps: true })
export class GroupChat {
    @PrimaryGeneratedColumn('uuid')
    id: number;
    
    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    avatar: string;

    @Prop()
    roomId: string;

    @Prop()
    participants: String[]; // ids: [128, 129, 168, 189]

    @Prop({ type: Object })
    policy: object;

    @Prop({ default: true })
    status: boolean;

    @Prop({ default: false })
    isBlocked: boolean;

    @Prop()
    author: string;

    @Prop()
    createdAt: Date;  
}

type GroupChatDocument = HydratedDocument<GroupChat>;
type GroupChatModel = SoftDeleteModel<GroupChatDocument>;
const GroupChatSchema = SchemaFactory.createForClass(GroupChat).plugin(mongooseDelete, { overrideMethods: true });
export { GroupChatDocument, GroupChatSchema, GroupChatModel}