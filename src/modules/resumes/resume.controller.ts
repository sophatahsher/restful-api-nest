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

import { QueryParamsResumeDto } from './dto/list.dto';
import { ResumeService } from './resume.service';
import { CreateAppUserResumeDto } from './dto/create-resume.dto';
import { UpdateAppUserResumeDto } from './dto/update-resume.dto';

@ApiTags('resumes')
@ApiBearerAuth()
@UseGuards(TokenAuthGuard)
@Controller('resumes')
export class ResumeController {
    constructor(private resumeService: ResumeService) {}

    @Get()
    async findAll(@Auth() auth, @Query() qry: QueryParamsResumeDto) {
        const { data, metadata } = await this.resumeService.findAll(auth, qry);
        return { data: data, metadata: metadata };
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        return { data: await this.resumeService.findById(id) };
    }

    @HttpCode(200)
    @Post()
    async create(@Auth() auth, @Body() createParamsDto: CreateAppUserResumeDto): Promise<HttpResponse> {
        console.log('auth=========', auth);
        console.log('createParamsDto=========', createParamsDto);
        const result = await this.resumeService.create(auth, createParamsDto);
        return { data: result }
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateAppUserResumeDto): Promise<HttpResponse> {
        const result = await this.resumeService.update(id, updateUserDto);
        return { data: result };
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.resumeService.remove(id);
    }
}
