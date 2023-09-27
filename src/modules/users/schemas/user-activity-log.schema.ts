import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SoftDeleteModel } from 'mongoose-delete';
import * as mongooseDelete from 'mongoose-delete';

@Schema({ collection: 'app_member_activity_logs', timestamps: true })
export class UserMemberActivityLog {
    @Prop()
    member: string;
    
    @Prop()
    eventType: string; // login, logout, ...ect.

    @Prop()
    request: string;

    @Prop()
    responseStatus: string;

    @Prop()
    response: string;

    @Prop()
    metadata: object;
}

type UserMemberActivityLogDocument = HydratedDocument<UserMemberActivityLog>;
type UserMemberActivityLogModel = SoftDeleteModel<UserMemberActivityLogDocument>;
const UserMemberActivityLogSchema = SchemaFactory.createForClass(UserMemberActivityLog).plugin(mongooseDelete, {
    overrideMethods: true
});
export { UserMemberActivityLogDocument, UserMemberActivityLogSchema, UserMemberActivityLogModel };
