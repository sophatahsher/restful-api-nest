import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SoftDeleteModel } from 'mongoose-delete';
import * as mongooseDelete from 'mongoose-delete';

@Schema({ collection: 'merchant_profiles', timestamps: true })
export class MerchantProfile {
    @Prop()
    merchantId: string;

    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop()
    email: string;

    @Prop()
    contactNumber: string;

    @Prop()
    address: string;

    @Prop()
    country: string;

    @Prop()
    region: string;
    
    @Prop({ default: true })
    status: boolean;
}

type MerchantProfileDocument = HydratedDocument<MerchantProfile>;
type MerchantProfileModel = SoftDeleteModel<MerchantProfileDocument>;
const MerchantProfileSchema = SchemaFactory.createForClass(MerchantProfile).plugin(mongooseDelete, { overrideMethods: true });
export { MerchantProfileDocument, MerchantProfileSchema, MerchantProfileModel}