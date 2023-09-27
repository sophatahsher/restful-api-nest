import { Auth } from './../../common/decorators/authGuard.decorator';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ErrorCode, ErrorMessage, ResponseStatusCode, Status } from 'src/common/enums/responseMessage';
import { generatePages, stringContext } from 'src/common/utils/utility';
import { QueryParamsResumeTemplateDto } from './dto/template-list.dt';
import { CreateResumeTemplateDto } from './dto/create-template.dto';
import { UpdateResumeTemplateDto } from './dto/update-template.dto';
import { ResumeTemplate, ResumeTemplateModel } from './schemas/template.schema';

@Injectable()
export class ResumeTemplateService {
    constructor(@InjectModel(ResumeTemplate.name) private resumeTemplateModel: ResumeTemplateModel) {}

    async findOne(id: string) {
        return this.resumeTemplateModel.findById(id);
    }

    async create(auth: any, resumeTemplateObj: CreateResumeTemplateDto ) {
        try {
            // prevent create with duplicated Template
            const countExists = await this.resumeTemplateModel.findOne({ name: resumeTemplateObj.name}).countDocuments();
            if ( countExists > 0 )
                throw new HttpException(
                    {
                        status: Status.FAILED,
                        errorCode: ErrorCode.RECORD_IS_EXISTS,
                        statusCode: ResponseStatusCode.RECORD_EXISTS,
                        errorMessage: stringContext(ErrorMessage.RECORD_IS_EXISTS, { var1: resumeTemplateObj.name })
                    },
                    HttpStatus.BAD_REQUEST
                );

            // Params
            const createParams = {
                member: auth._id,
                ...resumeTemplateObj
            }

            // create DB's record
            await this.resumeTemplateModel.create(createParams);

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

    async findAll( qry: QueryParamsResumeTemplateDto ) {
        // 
        const pagination = generatePages(qry);

        const records = await this.resumeTemplateModel.find()
        .skip(pagination.offset)
        .limit(pagination.limit)
        .sort( { createdAt: -1 } )
        .exec();
        const totalRecords = await this.resumeTemplateModel.find().countDocuments();
        const metadata = {
            total: totalRecords,
            ...pagination
        }

        return { data: records, metadata: metadata}
    }

    async findById(id: string) {
        return this.resumeTemplateModel.findById(id);
    }

    async findByName(name: string) {
        return this.resumeTemplateModel.findOne({ name }).exec();
    }

    // UPDATE
    async update(id: string, resumeTemplateObj: UpdateResumeTemplateDto) {
        try {
            const countExists = await this.resumeTemplateModel.findOne({name: resumeTemplateObj.name, _id: { $ne: id }}).countDocuments(); 
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
            await this.resumeTemplateModel.findByIdAndUpdate(id, resumeTemplateObj, { new: true }).exec();

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

    // DELETE
    async remove(id: string) {
        return await this.resumeTemplateModel.findByIdAndDelete(id).exec();
    }

    // Lockup Section
    async findDefaultResumeTemplates() {
        // 
        const records = await this.resumeTemplateModel.find().exec();
        return { data: records}
    }
}
