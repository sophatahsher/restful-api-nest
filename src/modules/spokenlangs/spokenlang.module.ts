import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandModule } from 'nestjs-command';
import { SpokenLanguage, SpokenLanguageSchema } from './schemas/spokenlang.schema';
import { SpokenLanguageController } from './spokenlang.controller';
import { SpokenLanguageService } from './spokenlang.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: SpokenLanguage.name, schema: SpokenLanguageSchema }]),
        CommandModule
    ],
    controllers: [SpokenLanguageController],
    providers: [SpokenLanguageService],
    exports: [SpokenLanguageService]
})
export class SpokenLanguageModule {}
