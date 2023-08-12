import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { SoftDeleteModel } from 'mongoose-delete';
import * as mongooseDelete from 'mongoose-delete';
import { Merchant } from 'src/modules/merchant/schemas/merchant.schema';

@Schema({ collection: 'authorization_keys', timestamps: true })
export class AuthorizationKey {

    @Prop()
    name: string;

    @Prop()
    key: string;

    @Prop()
    plain: string;

    @Prop()
    type: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Merchant' })
    merchant: Merchant;
}

type AuthorizationKeyDocument = HydratedDocument<AuthorizationKey>;
type AuthorizationKeyModel = SoftDeleteModel<AuthorizationKeyDocument>;
const AuthorizationKeySchema = SchemaFactory.createForClass(AuthorizationKey).plugin(mongooseDelete, {
    overrideMethods: true
});

export { AuthorizationKeyDocument, AuthorizationKeySchema, AuthorizationKeyModel };
