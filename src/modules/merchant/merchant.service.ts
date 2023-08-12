import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Merchant, MerchantModel } from './schemas/merchant.schema';

@Injectable()
export class MerchantService {
    constructor(@InjectModel(Merchant.name) private merchantModel: MerchantModel) {}

    async create(data: any) {
        return this.merchantModel.create(data);

    }

    async findOne(id: string) {
        return this.merchantModel.findById(id);
    }

    async findBy(where: any) {
        return this.merchantModel.findOne(where);
    }
}
