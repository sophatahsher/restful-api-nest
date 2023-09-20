import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SoftDeleteModel } from 'mongoose-delete';
import * as mongooseDelete from 'mongoose-delete';

@Schema({ collection: 'app_education_degrees', timestamps: true })
export class EducationDegree {
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

type EducationDegreeDocument = HydratedDocument<EducationDegree>;
type EducationDegreeModel = SoftDeleteModel<EducationDegreeDocument>;
const EducationDegreeSchema = SchemaFactory.createForClass(EducationDegree).plugin(mongooseDelete, {
    overrideMethods: true
});
export { EducationDegreeDocument, EducationDegreeSchema, EducationDegreeModel };
