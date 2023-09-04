import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import MongooseDelete, { SoftDeleteModel } from 'mongoose-delete';

@Schema({ collection: 'notifications', timestamps: true })
export class Notifications {
    @Prop({ required: true, unique: true })
    subject: string;

    @Prop()
    body: string;

    @Prop({ default: false })
    hasRead: boolean;

    @Prop()
    readDate: Date;

    @Prop()
    sentDate: Date;

    @Prop()
    sentToUser: String;

    @Prop()
    sentFromUser: Date;

    @Prop({ default: true })
    status: boolean;
}
type NotificationsDocument = HydratedDocument<Notifications>;
type NotificationsModel = SoftDeleteModel<NotificationsDocument>;
const NotificationsSchema = SchemaFactory.createForClass(Notifications); //.plugin(MongooseDelete, { overrideMethods: true });
export { NotificationsDocument, NotificationsSchema, NotificationsModel };
