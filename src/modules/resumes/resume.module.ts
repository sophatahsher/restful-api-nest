import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandModule } from 'nestjs-command';
import { Resume, ResumeSchema } from './schemas/resume.schema';
import { ResumeController } from './resume.controller';
import { ResumeService } from './resume.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Resume.name, schema: ResumeSchema }]),
        CommandModule
    ],
    controllers: [ResumeController],
    providers: [ResumeService],
    exports: [ResumeService]
})
export class ResumeModule {}
