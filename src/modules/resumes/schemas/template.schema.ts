import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { SoftDeleteModel } from 'mongoose-delete';
import * as mongooseDelete from 'mongoose-delete';
import { UserMember } from 'src/modules/users/schemas/user.schema';
import { ObjectId } from 'typeorm';


@Schema({ collection: 'app_resume_templates', timestamps: true })
export class ResumeTemplate {

    @Prop()
    name: string;

    @Prop()
    introContent: string;

    @Prop()
    content: string;

    @Prop()
    type: string;

    @Prop({ default: 1, required: false })
    status: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserMember' })
    member: UserMember | ObjectId;

    @Prop({ default: 'app'})
    createdType: string;
}

type ResumeTemplateDocument = HydratedDocument<ResumeTemplate>;
type ResumeTemplateModel = SoftDeleteModel<ResumeTemplateDocument>;
const ResumeTemplateSchema = SchemaFactory.createForClass(ResumeTemplate).plugin(mongooseDelete, {
    overrideMethods: true
});
export { ResumeTemplateDocument, ResumeTemplateSchema, ResumeTemplateModel };
