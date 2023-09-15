import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SoftDeleteModel } from 'mongoose-delete';
import * as mongooseDelete from 'mongoose-delete';

//@Schema({ collection: 'users', timestamps: true })
@Schema({ collection: 'app_users', timestamps: true })
export class User {

    @Prop({ required: true })
    firstName: string;

    @Prop({ required: true })
    lastName: string;

    @Prop()
    email: string;

    @Prop()
    phoneNumber: string;

    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({ default: 1, required: false })
    status: number;
}

type UserDocument = HydratedDocument<User>;
type UserModel = SoftDeleteModel<UserDocument>;
const UserSchema = SchemaFactory.createForClass(User).plugin(mongooseDelete, {
    overrideMethods: true
});
export { UserDocument, UserSchema, UserModel };
