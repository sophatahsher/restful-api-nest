import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SoftDeleteModel } from 'mongoose-delete';
import * as mongooseDelete from 'mongoose-delete';

@Schema({ collection: 'languages', timestamps: true })
export class Languages {
    @Prop()
    name: string;

    @Prop()
    native_name: string;

    @Prop()
    slug: string;

    @Prop()
    code: string;

    @Prop()
    iso3: string;

    @Prop()
    flag: string;

    @Prop({ default: 1 })
    status: number;
}

type LanguagesDocument = HydratedDocument<Languages>;
type LanguagesModel = SoftDeleteModel<LanguagesDocument>;
const LanguagesSchema = SchemaFactory.createForClass(Languages).plugin(
    mongooseDelete,
    { overrideMethods: true }
);
export { LanguagesDocument, LanguagesSchema, LanguagesModel };
