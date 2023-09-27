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
import { ResumeTemplateService } from './template.service';

import { QueryParamsResumeTemplateDto } from './dto/template-list.dt';
import { CreateResumeTemplateDto } from './dto/create-template.dto';
import { UpdateResumeTemplateDto } from './dto/update-template.dto';

@ApiTags('templates')
@ApiBearerAuth()
@UseGuards(TokenAuthGuard)
@Controller('resume/templates')
export class ResumeTemplateController {
    constructor(private resumeTemplateService: ResumeTemplateService) {}

    @Get()
    async findAll(@Query() qry: QueryParamsResumeTemplateDto) {
        const { data, metadata } = await this.resumeTemplateService.findAll(qry);
        return { data: data, metadata: metadata };
    }

    @Get('/all')
    async findDefaultResumeTemplates(@Query() qry: QueryParamsResumeTemplateDto) {
        const { data } = await this.resumeTemplateService.findDefaultResumeTemplates();
        return { data: data };
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        return { data: await this.resumeTemplateService.findById(id) };
    }

    @HttpCode(200)
    @Post()
    async create(@Auth() auth, @Body() createParamsDto: CreateResumeTemplateDto): Promise<HttpResponse> {
        const result = await this.resumeTemplateService.create(auth, createParamsDto);
        return { data: result }
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateResumeTemplateDto): Promise<HttpResponse> {
        const result = await this.resumeTemplateService.update(id, updateUserDto);
        return { data: result };
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.resumeTemplateService.remove(id);
    }
}
