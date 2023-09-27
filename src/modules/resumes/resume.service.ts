import { Auth } from './../../common/decorators/authGuard.decorator';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { hashStringWithSalt } from 'src/common/utils/encryption';
import { ErrorCode, ErrorMessage, ResponseStatusCode, Status } from 'src/common/enums/responseMessage';
import { QueryParamsResumeDto } from './dto/list.dto';
import { generatePages } from 'src/common/utils/utility';
import { CreateAppUserResumeDto } from './dto/create-resume.dto';
import { UpdateAppUserResumeDto } from './dto/update-resume.dto';
import { Resume, ResumeModel } from './schemas/resume.schema';
import { ResumeTemplate, ResumeTemplateModel } from './schemas/template.schema';
@Injectable()
export class ResumeService {
    constructor(
        @InjectModel(Resume.name) private resumeModel: ResumeModel,
        @InjectModel(ResumeTemplate.name) private resumeTemplateModel: ResumeTemplateModel,
    ) {}

    async findOne(id: string) {
        return this.resumeModel.findById(id);
    }

    async create(auth: any, resumeObj: CreateAppUserResumeDto ) {
        try {
            console.log('resumeObj=========', resumeObj);
            /*
            // prevent create with duplicated account
            const countExists = await this.resumeModel.findOne({ username: userObject.username}).countDocuments();
            if ( countExists > 0 )
                throw new HttpException(
                    {
                        status: Status.FAILED,
                        errorCode: ErrorCode.RECORD_IS_EXISTS,
                        statusCode: ResponseStatusCode.RECORD_EXISTS,
                        errorMessage: ErrorMessage.RECORD_IS_EXISTS
                    },
                    HttpStatus.BAD_REQUEST
                );
            */
            
            // Unpublish exist record if new creation is publish
            if( resumeObj.isPublish )
                await this.resumeModel.updateMany({ _id: auth._id }, { $set: { isPublish: false, isDefault: false }})

            // Params
            const createParams = {
                member: auth._id,
                ...resumeObj,
                createdType: 'app'
            }

            // create DB's record
            await this.resumeModel.create(createParams);
            
            return 'OK';

        } catch (error) {
            throw new HttpException({
                    status: Status.FAILED,
                    errorCode: error?.response?.errorCode ? error?.response?.errorCode : ErrorCode.ERROR_UNKNOWN,
                    statusCode: error?.response?.statusCode ? error?.response?.statusCode : ResponseStatusCode.ERROR_UNKNOWN,
                    errorMessage: error?.response?.errorMessage ? error?.response?.errorMessage : ErrorMessage.ERROR_UNKNOWN
                },
                error?.status ? error?.status : HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    async findAll( auth: any, qry: QueryParamsResumeDto ) {
        // 
        const pagination = generatePages(qry);

        const records = await this.resumeModel.find()
        .skip(pagination.offset)
        .limit(pagination.limit)
        .sort( { createdAt: -1 } )
        .exec();

        const totalRecords = await this.resumeModel.find().countDocuments();
        const metadata = {
            total: totalRecords,
            ...pagination
        }

        return { data: records, metadata: metadata}
    }

    async findById(id: string) {
        return this.resumeModel.findById(id);
    }

    async findByUsername(username: string) {
        return this.resumeModel.findOne({ username }).exec();
    }

    async update(id: string, userObject: UpdateAppUserResumeDto) {
        try {
            const countExists = await this.resumeModel.findOne({username: userObject.username, _id: { $ne: id }}).countDocuments(); 
            if ( countExists > 0 ) {
                throw new HttpException({
                        status: Status.FAILED,
                        errorCode: ErrorCode.RECORD_IS_EXISTS,
                        statusCode: ResponseStatusCode.RECORD_EXISTS,
                        errorMessage: ErrorMessage.RECORD_IS_EXISTS
                    },
                    HttpStatus.BAD_REQUEST
                );
            }

            userObject.password = hashStringWithSalt(userObject.password, 16);

            await this.resumeModel.findByIdAndUpdate(id, userObject, { new: true }).exec();

            return 'OK';

        } catch (error) {
        
            throw new HttpException({
                    status: Status.FAILED,
                    errorCode: error?.response?.errorCode ? error?.response?.errorCode : ErrorCode.ERROR_UNKNOWN,
                    statusCode: error?.response?.statusCode ? error?.response?.statusCode : ResponseStatusCode.ERROR_UNKNOWN,
                    errorMessage: error?.response?.errorMessage ? error?.response?.errorMessage : ErrorMessage.ERROR_UNKNOWN
                },
                error?.status ? error?.status : HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    async remove(id: string) {
        return await this.resumeModel.findByIdAndDelete(id).exec();
    }

    // Section

    async updateEducation() {

    }

    async updateExperience() {
        
    }

    async updateLanguages() {
        
    }

    async updateSkillSet() {
        
    }

    async updateHobbies() {
        
    }

    async updateAddresses() {
        
    }

    async updateReferences() {
        
    }

    async updateAdditionalInfo() {
        
    }

    async updateScreenshots() {
        
    }

    async updateIsDefault() {
        
    }

    async updateEmergencyContact() {
        
    }

    async updateAchievements() {
        
    }

    async updatePortfolios() {
        
    }
}
