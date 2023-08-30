import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SoftDeleteModel } from 'mongoose-delete';
import * as mongooseDelete from 'mongoose-delete';

class EmailNotification {
    newMessage: boolean;
    newFollow: boolean
}

class SoundNotification {
    newMessage: boolean;
    newFollow: boolean
}

class EmailChat {
    newMessage: boolean;
    newFollow: boolean
}

class SoundChat {
    newMessage: boolean;
    newFollow: boolean
}

@Schema({ collection: 'merchant_settings', timestamps: true })
export class MerchantSetting {
    @Prop()
    merchantId: string;

    @Prop()
    isVisible: boolean;

    @Prop({ type: Object })
    chat: {
        email: EmailChat,
        sound: SoundChat,
        allowedAll: boolean,
        disabledAll: boolean
    };

    @Prop({ type: Object })
    notifications: {
        email: EmailNotification,
        sound: SoundNotification,
        allowedAll: boolean,
        disabledAll: boolean
    };
    
    @Prop({ default: true })
    status: boolean;
}

type MerchantSettingDocument = HydratedDocument<MerchantSetting>;
type MerchantSettingModel = SoftDeleteModel<MerchantSettingDocument>;
const MerchantSettingSchema = SchemaFactory.createForClass(MerchantSetting).plugin(mongooseDelete, { overrideMethods: true });
export { MerchantSettingDocument, MerchantSettingSchema, MerchantSettingModel}