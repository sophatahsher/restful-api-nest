import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandModule } from 'nestjs-command';
import { CoverLetter, CoverLetterSchema } from './schemas/coverletter.schema';
import { CoverLetterController } from './coverletter.controller';
import { CoverLetterService } from './coverletter.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: CoverLetter.name, schema: CoverLetterSchema }]),
        CommandModule
    ],
    controllers: [CoverLetterController],
    providers: [CoverLetterService],
    exports: [CoverLetterService]
})
export class CoverLetterModule {}
