import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SoftDeleteModel } from 'mongoose-delete';
import * as mongooseDelete from 'mongoose-delete';

@Schema({ collection: 'app_recovery_tokens', timestamps: true })
export class RecoveryToken {
    @Prop()
    member: string;

    @Prop()
    refreshToken: string;

    @Prop()
    expiration: string;
}

type RecoveryTokenDocument = HydratedDocument<RecoveryToken>;
type RecoveryTokenModel = SoftDeleteModel<RecoveryTokenDocument>;
const RecoveryTokenSchema = SchemaFactory.createForClass(RecoveryToken).plugin(mongooseDelete, {
    overrideMethods: true
});
export { RecoveryTokenDocument, RecoveryTokenSchema, RecoveryTokenModel };
