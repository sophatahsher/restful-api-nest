import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SoftDeleteModel } from 'mongoose-delete';
import * as mongooseDelete from 'mongoose-delete';

@Schema({ collection: 'app_countries', timestamps: true })
export class Country {
    @Prop()
    name: string;

    @Prop()
    common_name: string;

    @Prop()
    official_name: string;

    @Prop()
    iso2: string;

    @Prop()
    iso3: string;

    @Prop()
    phone_code: string;

    @Prop()
    nationality: string;

    @Prop()
    origin_name: string;

    @Prop({ default: 1 })
    status: number;
}

type CountryDocument = HydratedDocument<Country>;
type CountryModel = SoftDeleteModel<CountryDocument>;
const CountrySchema = SchemaFactory.createForClass(Country).plugin(
    mongooseDelete,
    { overrideMethods: true }
);
export { CountryDocument, CountrySchema, CountryModel };
