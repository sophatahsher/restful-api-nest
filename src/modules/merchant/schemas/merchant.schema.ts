import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SoftDeleteModel } from 'mongoose-delete';
import * as mongooseDelete from 'mongoose-delete';

@Schema({ collection: 'merchants', timestamps: true })
export class Merchant {
    @Prop()
    username: string;

    @Prop()
    password: string;

    @Prop()
    loginType: string;
    
    @Prop({ default: true })
    status: boolean;
}

type MerchantDocument = HydratedDocument<Merchant>;
type MerchantModel = SoftDeleteModel<MerchantDocument>;
const MerchantSchema = SchemaFactory.createForClass(Merchant).plugin(mongooseDelete, { overrideMethods: true });
export { MerchantDocument, MerchantSchema, MerchantModel}