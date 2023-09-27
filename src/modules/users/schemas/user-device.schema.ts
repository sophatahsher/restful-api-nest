import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SoftDeleteModel } from 'mongoose-delete';
import * as mongooseDelete from 'mongoose-delete';

@Schema({ collection: 'app_member_devices', timestamps: true })
export class UserMemberDevice {
    @Prop()
    member: string;
    
    @Prop({ required: true })
    app: string; // the app id, usually something like com.moodle.moodlemobile

    @Prop({ required: true })
    name: string;

    @Prop()
    model: string;

    @Prop()
    platform: string;

    @Prop()
    version: string;

    @Prop()
    os: string;

    @Prop()
    pushToken: string; // the device PUSH token/key/identifier/registration id

    @Prop()
    uuid: string;
}

type UserMemberDeviceDocument = HydratedDocument<UserMemberDevice>;
type UserMemberDeviceModel = SoftDeleteModel<UserMemberDeviceDocument>;
const UserMemberDeviceSchema = SchemaFactory.createForClass(UserMemberDevice).plugin(mongooseDelete, {
    overrideMethods: true
});
export { UserMemberDeviceDocument, UserMemberDeviceSchema, UserMemberDeviceModel };
