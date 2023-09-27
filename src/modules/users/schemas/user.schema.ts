import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SoftDeleteModel } from 'mongoose-delete';
import * as mongooseDelete from 'mongoose-delete';
@Schema({ collection: 'app_users', timestamps: true })
export class UserMember {

    @Prop()
    email: string;

    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({ default: 1, required: false })
    status: number;
}

type UserMemberDocument = HydratedDocument<UserMember>;
type UserMemberModel = SoftDeleteModel<UserMemberDocument>;
const UserMemberSchema = SchemaFactory.createForClass(UserMember).plugin(mongooseDelete, {
    overrideMethods: true
});
export { UserMemberDocument, UserMemberSchema, UserMemberModel };
