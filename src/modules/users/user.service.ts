import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAppUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument, UserModel } from './schemas/user.schema';
import { hashStringWithSalt } from 'src/common/utils/encryption';
import { ErrorCode, ErrorMessage, ResponseStatusCode, Status } from 'src/common/enums/responseMessage';
import { QueryParamsDto } from './dto/list.dto';
import { generatePages } from 'src/common/utils/utility';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: UserModel) {}

    async findOne(id: string) {
        return this.userModel.findById(id);
    }

    async create( userObject: CreateAppUserDto ) {
        try {
            // prevent create with duplicated account
            const countExists = await this.userModel.findOne({ username: userObject.username}).countDocuments();
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

            userObject.password = hashStringWithSalt(userObject.password, 16);
            await this.userModel.create(userObject);
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

    async findAll( qry: QueryParamsDto ) {
        // 
        const pagination = generatePages(qry);

        const records = await this.userModel.find()
        .skip(pagination.offset)
        .limit(pagination.limit)
        .sort( { createdAt: -1 } )
        .exec();

        const totalRecords = await this.userModel.find().countDocuments();
        const metadata = {
            total: totalRecords,
            ...pagination
        }

        return { data: records, metadata: metadata}
    }

    async findById(id: string) {
        return this.userModel.findById(id);
    }

    async findByUsername(username: string) {
        return this.userModel.findOne({ username }).exec();
    }

    async update(id: string, userObject: UpdateUserDto) {
        try {
            const countExists = await this.userModel.findOne({username: userObject.username, _id: { $ne: id }}).countDocuments(); 
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

            await this.userModel.findByIdAndUpdate(id, userObject, { new: true }).exec();

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
        return await this.userModel.findByIdAndDelete(id).exec();
    }
}
