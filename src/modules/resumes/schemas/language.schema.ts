import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SoftDeleteModel } from 'mongoose-delete';
import * as mongooseDelete from 'mongoose-delete';

@Schema({ collection: 'app_spoken_languages', timestamps: true })
export class SpokenLanguage {
    @Prop()
    id: string;

    @Prop({ required: true })
    name: string;

    @Prop()
    native_name: string;

    @Prop()
    slug: string;

    @Prop()
    code: string;

    @Prop()
    flag: string;

    @Prop({ default: 1, required: false })
    status: number;
}

type SpokenLanguageDocument = HydratedDocument<SpokenLanguage>;
type SpokenLanguageModel = SoftDeleteModel<SpokenLanguageDocument>;
const SpokenLanguageSchema = SchemaFactory.createForClass(SpokenLanguage).plugin(mongooseDelete, {
    overrideMethods: true
});
export { SpokenLanguageDocument, SpokenLanguageSchema, SpokenLanguageModel };
