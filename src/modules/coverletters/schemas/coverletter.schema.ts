import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsArray, IsEnum, IsObject } from 'class-validator';
import mongoose, { HydratedDocument } from 'mongoose';
import { SoftDeleteModel } from 'mongoose-delete';
import * as mongooseDelete from 'mongoose-delete';

import { ResumeTemplate } from './../../resumes/schemas/template.schema';
import { ObjectId } from 'typeorm';
import { UserMember } from 'src/modules/users/schemas/user.schema';

@Schema({ collection: 'app_cover_letters', timestamps: true })
export class CoverLetter {

    @Prop()
    name: string;

    @Prop()
    introContent: string;

    @Prop()
    content: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ResumeTemplate', required: false })
    template: ResumeTemplate | ObjectId;

    @Prop({ default: 1, required: false })
    status: number;
    
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserMember' })
    member: UserMember | ObjectId;

    @Prop({ default: 'app'})
    createdType: string;
}

type CoverLetterDocument = HydratedDocument<CoverLetter>;
type CoverLetterModel = SoftDeleteModel<CoverLetterDocument>;
const CoverLetterSchema = SchemaFactory.createForClass(CoverLetter).plugin(mongooseDelete, {
    overrideMethods: true
});
export { CoverLetterDocument, CoverLetterSchema,CoverLetterModel };
