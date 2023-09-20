import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SoftDeleteModel } from 'mongoose-delete';
import * as mongooseDelete from 'mongoose-delete';

@Schema({ collection: 'app_industries', timestamps: true })
export class Industry {
    @Prop()
    id: string;

    @Prop({ required: true })
    name: string;

    @Prop()
    description: string;

    @Prop({ default: 1, required: false })
    status: number;

    @Prop()
    createdBy: string;
}

type IndustryDocument = HydratedDocument<Industry>;
type IndustryModel = SoftDeleteModel<IndustryDocument>;
const IndustrySchema = SchemaFactory.createForClass(Industry).plugin(mongooseDelete, {
    overrideMethods: true
});
export { IndustryDocument, IndustrySchema,IndustryModel };
