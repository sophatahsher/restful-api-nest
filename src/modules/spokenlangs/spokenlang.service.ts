import { Auth } from './../../common/decorators/authGuard.decorator';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SpokenLanguage, SpokenLanguageModel } from '../resumes/schemas/language.schema';

@Injectable()
export class SpokenLanguageService {
    constructor(@InjectModel(SpokenLanguage.name) private spokenLanguageModel: SpokenLanguageModel) {}

    async findAll() {
        const records = await this.spokenLanguageModel.find()
        .sort( { name: 1 } )
        .exec();

        return { data: records}
    }
}
