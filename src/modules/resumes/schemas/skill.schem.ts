import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SoftDeleteModel } from 'mongoose-delete';
import * as mongooseDelete from 'mongoose-delete';

@Schema({ collection: 'app_skills', timestamps: true })
export class Skill {
    @Prop()
    id: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    score: number;

    @Prop()
    slug: string;

    @Prop()
    industry: string;

    @Prop()
    category: string;

    @Prop({ default: 1, required: false })
    status: number;

    @Prop()
    createdBy: string;
}

type SkillDocument = HydratedDocument<Skill>;
type SkillModel = SoftDeleteModel<SkillDocument>;
const SkillSchema = SchemaFactory.createForClass(Skill).plugin(mongooseDelete, {
    overrideMethods: true
});
export { SkillDocument, SkillSchema, SkillModel };
