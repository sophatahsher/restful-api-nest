import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SoftDeleteModel } from 'mongoose-delete';
import * as mongooseDelete from 'mongoose-delete';

@Schema({ collection: 'app_member_profiles', timestamps: true })
export class UserMemberProfile {
    @Prop()
    member: string;
    
    @Prop({ required: true })
    firstName: string;

    @Prop({ required: true })
    lastName: string;

    @Prop()
    email: string;

    @Prop()
    phone: string;

    @Prop({ required: false })
    avatar: string;

    @Prop()
    city: string;

    @Prop()
    country: string;

    @Prop({ required: false })
    lastLogin: Date;

    @Prop({ required: false })
    loginIp: string;
}

type UserMemberProfileDocument = HydratedDocument<UserMemberProfile>;
type UserMemberProfileModel = SoftDeleteModel<UserMemberProfileDocument>;
const UserMemberProfileSchema = SchemaFactory.createForClass(UserMemberProfile).plugin(mongooseDelete, {
    overrideMethods: true
});
export { UserMemberProfileDocument, UserMemberProfileSchema, UserMemberProfileModel };
