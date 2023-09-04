import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SoftDeleteModel } from 'mongoose-delete';
import * as mongooseDelete from 'mongoose-delete';

@Schema({ collection: 'users', timestamps: true })
export class User {
    @Prop({ required: true, unique: true })
    username: string;

    @Prop()
    password: string;

    @Prop()
    email: string;

    @Prop({ default: true })
    status: boolean;
}

type UserDocument = HydratedDocument<User>;
type UserModel = SoftDeleteModel<UserDocument>;
const UserSchema = SchemaFactory.createForClass(User).plugin(mongooseDelete, {
    overrideMethods: true
});
export { UserDocument, UserSchema, UserModel };
