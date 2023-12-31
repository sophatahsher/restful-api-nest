import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsArray, IsEnum, IsObject } from 'class-validator';
import mongoose, { HydratedDocument } from 'mongoose';
import { SoftDeleteModel } from 'mongoose-delete';
import * as mongooseDelete from 'mongoose-delete';
import { AddressType, FrequencyPayment, NoticePeriod, WorkType } from '../enums/resume.enum';
import { EducationDegree } from './degree.schema';
import { SpokenLanguage } from './language.schema';
import { Type } from 'class-transformer';
import { number } from 'yargs';
import { User } from 'src/modules/users/schemas/user.schema';

class Education {
    @Prop()
    id: string

    @Prop()
    degree: EducationDegree;

    @Prop()
    school: string;

    @Prop()
    specialization: string;

    @Prop()
    finalGrade: string;

    @Prop()
    scoreType: string;

    @Prop()
    city: string;

    @Prop()
    state: string;

    @Prop()
    country: string;

    @Prop()
    location: string;

    @Prop()
    startedAt: string;

    @Prop()
    endedAt: string;

    @Prop()
    description: string;
}

class Dependent {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    relationship: string;

    @Prop()
    gender: string;

    @Prop()
    dob: Date;

    @Prop()
    phoneNumber: string;

    @Prop()
    address: string;
}

class Addresses {
    @Prop({ enum: AddressType})
    @IsEnum(AddressType)
    addressType: AddressType;

    @Prop({ required: true })
    addressLine1: string;

    @Prop()
    addressLine2: string;

    @Prop()
    subDistrict: string;

    @Prop()
    district: string;

    @Prop()
    province: Date;

    @Prop()
    country: string;

    @Prop()
    postCode: string;

    @Prop()
    fax: string;
}

class Experience {
    @Prop()
    id: string

    @Prop()
    position: string;

    @Prop()
    company: string;

    @Prop()
    salary: string;

    @Prop()
    salaryLessThan: string;

    @Prop()
    salaryGreaterThan: string;

    @Prop()
    currency: string;

    @Prop({ enum: FrequencyPayment})
    @IsEnum(FrequencyPayment)
    frequency: FrequencyPayment;

    @Prop()
    startedAt: Date;

    @Prop()
    endedAt: Date;

    @Prop()
    city: string;

    @Prop()
    state: string;

    @Prop()
    country: string;

    @Prop()
    location: string;

    @Prop({ default: false })
    isCurrentEmployed: boolean;
}

class currentSalary {
    @Prop()
    salary: number;
    
    @Prop({ enum: FrequencyPayment})
    @IsEnum(FrequencyPayment)
    frequency: FrequencyPayment;

    @Prop({ enum: WorkType})
    @IsEnum(WorkType)
    workType: WorkType;
}

class AdditionalInfo {
    @Prop()
    yearOfExperience: number;

    @Prop()
    graduationDate: Date;

    @Prop()
    currentSalary: currentSalary;

    @Prop()
    currentBenefits: string;

    @Prop({ enum: NoticePeriod})
    @IsEnum(NoticePeriod)
    noticePeriod: NoticePeriod;

    @Prop()
    nationalities: string; // dropdown from countries
}


class EmergencyContact {
    @Prop({ type: number, unique: true, index: true, required: true })
    id: number;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    relationship: string;

    @Prop()
    gender: string;

    @Prop()
    dob: Date;

    @Prop()
    phoneNumber: string;

    @Prop()
    officeNumber: string;

    @Prop()
    email: string;

    @Prop()
    address: string;
}

class Skill {
    // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' })
    // _id: Skill;
    @Prop()
    name: string;

    @Prop()
    score: number;
}

class Reference {
    @Prop()
    fullName: string;

    @Prop()
    company: string;

    @Prop()
    phoneNumber: string;

    @Prop()
    email: string;
}

class ProjectScreenshot {
    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    startedAt: string;

    @Prop()
    endedAt: string;

    @Prop()
    images: string[];
}

@Schema({ collection: 'app_resumes', timestamps: true })
export class Resume {

    @Prop({ required: true })
    firstName: string;

    @Prop({ required: true })
    lastName: string;

    @Prop({ required: true })
    personal: string;

    @Prop({ required: true })
    @IsArray()
    @Type(() => Skill)
    skills: Skill;

    @Prop({ required: true })
    education: Education;

    @Prop({ required: true })
    experience: Experience;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'SpokenLanguage', required: true })
    languages: SpokenLanguage | string;

    @Prop({ required: false })
    achievements: string;

    @Prop({ required: false })
    certifications: string;

    @Prop({ required: false })
    qualifications: string;

    @Prop({ required: false })
    @IsArray()
    @Type(() => EmergencyContact)
    emergencyContact: EmergencyContact;

    @Prop({ required: true })
    addresses: Addresses;

    @Prop({ required: false })
    dependent: Dependent;

    @Prop({ required: false })
    @IsArray()
    @Type(() => Reference)
    references: Reference;

    @Prop({ required: false })
    hobbies: string;

    @Prop({ required: false })
    @IsArray()
    @Type(() => ProjectScreenshot)
    screenshots: ProjectScreenshot;

    @Prop({ required: false })
    additionalInfo: AdditionalInfo; 

    @Prop({ default: true, required: false })
    isDefault: boolean;

    @Prop({ default: false, required: false })
    isPublish: boolean;

    @Prop({ default: false, required: false })
    isReferenceHidden: boolean;

    @Prop({ default: false, required: false })
    isExperienceLevelHidden: boolean;

    @Prop({ default: 1, required: false })
    status: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;

    @Prop({ default: 'app' })
    createdType: string;
}

type ResumeDocument = HydratedDocument<Resume>;
type ResumeModel = SoftDeleteModel<ResumeDocument>;
const ResumeSchema = SchemaFactory.createForClass(Resume).plugin(mongooseDelete, {
    overrideMethods: true
});
export { ResumeDocument, ResumeSchema, ResumeModel };
