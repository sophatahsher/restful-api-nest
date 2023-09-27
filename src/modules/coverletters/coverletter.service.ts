import { Auth } from './../../common/decorators/authGuard.decorator';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ErrorCode, ErrorMessage, ResponseStatusCode, Status } from 'src/common/enums/responseMessage';
import { generatePages, stringContext } from 'src/common/utils/utility';
import { CoverLetter, CoverLetterModel } from './schemas/coverletter.schema';
import { QueryParamsCoverLetterDto } from './dto/coverletter-list.dto';
import { CreateCoverLetterDto } from './dto/create-coverletter.dto';
import { UpdateCoverLetterDto } from './dto/update-coverletter.dto';

@Injectable()
export class CoverLetterService {
    constructor(@InjectModel(CoverLetter.name) private coverLetterModel: CoverLetterModel) {}

    async findOne(id: string) {
        return this.coverLetterModel.findById(id);
    }

    async create(auth: any, coverLetterObj: CreateCoverLetterDto ) {
        try {
            // prevent create with duplicated CoverLetter
            const countExists = await this.coverLetterModel.findOne({ name: coverLetterObj.name}).countDocuments();
            console.log('countExists => ', countExists);
            if ( countExists > 0 )
                throw new HttpException(
                    {
                        status: Status.FAILED,
                        errorCode: ErrorCode.RECORD_IS_EXISTS,
                        statusCode: ResponseStatusCode.RECORD_EXISTS,
                        errorMessage: stringContext(ErrorMessage.RECORD_IS_EXISTS, { var1: coverLetterObj.name })
                    },
                    HttpStatus.BAD_REQUEST
                );
            
            // Params
            const createParams = {
                ...coverLetterObj,
                createdBy: auth._id,
                createdType: 'admin'
            }

            // create DB's record
            await this.coverLetterModel.create(createParams);

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

    async findAll(auth: any, qry: QueryParamsCoverLetterDto ) {
        // 
        const pagination = generatePages(qry);

        const records = await this.coverLetterModel.find()
        .skip(pagination.offset)
        .limit(pagination.limit)
        .sort( { createdAt: -1 } )
        .exec();

        const totalRecords = await this.coverLetterModel.find().countDocuments();
        const metadata = {
            total: totalRecords,
            ...pagination
        }

        return { data: records, metadata: metadata}
    }

    async findById(id: string) {
        return this.coverLetterModel.findById(id);
    }

    async findByName(name: string) {
        return this.coverLetterModel.findOne({ name }).exec();
    }

    async update(auth: any, id: string, coverLetterObj: UpdateCoverLetterDto) {
        try {
            const countExists = await this.coverLetterModel.findOne({name: coverLetterObj.name, _id: { $ne: id }}).countDocuments(); 
            if ( countExists > 0 ) {
                throw new HttpException({
                        status: Status.FAILED,
                        errorCode: ErrorCode.RECORD_IS_EXISTS,
                        statusCode: ResponseStatusCode.RECORD_EXISTS,
                        errorMessage: stringContext(ErrorMessage.RECORD_IS_EXISTS, { var1: coverLetterObj.name })
                    },
                    HttpStatus.BAD_REQUEST
                );
            }

            await this.coverLetterModel.findByIdAndUpdate(id, { ...coverLetterObj, createdBy: auth._id, createdType: 'admin'}, { new: true }).exec();

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
        return await this.coverLetterModel.findByIdAndDelete(id).exec();
    }
}
