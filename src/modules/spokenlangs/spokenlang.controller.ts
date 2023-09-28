import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Put,
    HttpCode,
    Query,
    Version
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HttpResponse } from './../../common/http/response';
import { Auth } from 'src/common/decorators/authGuard.decorator';
import { TokenAuthGuard } from 'src/common/guards/auth.guard';

import { SpokenLanguageService } from './spokenlang.service';

@ApiTags('spoken-languages')
@ApiBearerAuth()
@UseGuards(TokenAuthGuard)
@Controller('resume/spoken-languages')
export class SpokenLanguageController {
    constructor(private spokenLanguageService: SpokenLanguageService) {}

    @Get()
    async findAll() {
        const { data } = await this.spokenLanguageService.findAll();
        return { data: data };
    }

    /*
    @Get(':id')
    async findById(@Param('id') id: string) {
        return { data: await this.spokenLanguageService.findById(id) };
    }
    
    @HttpCode(200)
    @Post()
    async create(@Auth() auth, @Body() createParamsDto: CreateCoverLetterDto): Promise<HttpResponse> {
        const result = await this.spokenLanguageService.create(auth, createParamsDto);
        return { data: result }
    }

    @Put(':id')
    async update(@Auth() auth, @Param('id') id: string, @Body() updateUserDto: UpdateCoverLetterDto): Promise<HttpResponse> {
        const result = await this.spokenLanguageService.update(auth, id, updateUserDto);
        return { data: result };
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.spokenLanguageService.remove(id);
    }
    */
}
