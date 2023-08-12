import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument, UserModel } from './schemas/user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: UserModel) {}

    async findOne(id: string) {
        return this.userModel.findById(id);
    }

    async create(createUserDto: CreateUserDto) {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }

    async findAll() {
        return await this.userModel.find().exec();
    }

    async findById(id: string) {
        return this.userModel.findById(id);
    }

    async findByUsername(username: string) {
        return this.userModel.findOne({ username }).exec();
    }

    async update(
        id: string,
        updateUserDto: UpdateUserDto,
    ) {
        return this.userModel
        .findByIdAndUpdate(id, updateUserDto, { new: true })
        .exec();
    }

    async remove(id: string) {
        return this.userModel.findByIdAndDelete(id).exec();
    }
}