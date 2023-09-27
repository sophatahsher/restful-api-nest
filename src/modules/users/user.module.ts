import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandModule } from 'nestjs-command';
import { UserMember, UserMemberSchema } from '../users/schemas/user.schema';
import { UserMemberController } from '../users/user.controller';
import { UserMemberService } from '../users/user.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: UserMember.name, schema: UserMemberSchema }]),
        CommandModule
    ],
    controllers: [UserMemberController],
    providers: [UserMemberService],
    exports: [UserMemberService]
})
export class UserMemberModule {}
