import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandModule } from 'nestjs-command';
import { Resume, ResumeSchema } from './schemas/resume.schema';
import { ResumeController } from './resume.controller';
import { ResumeService } from './resume.service';
import { ResumeTemplate, ResumeTemplateSchema } from './schemas/template.schema';
import { ResumeTemplateController } from './template.controller';
import { ResumeTemplateService } from './template.service';

@Module({
    imports: [
        MongooseModule.forFeature(
            [
                { name: Resume.name, schema: ResumeSchema },
                { name: ResumeTemplate.name, schema: ResumeTemplateSchema }
            ]
        ),
        CommandModule
    ],
    controllers: [ResumeController, ResumeTemplateController],
    providers: [ResumeService, ResumeTemplateService],
    exports: [ResumeService, ResumeTemplateService]
})
export class ResumeModule {}
