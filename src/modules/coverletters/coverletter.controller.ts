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

import { CoverLetterService } from './coverletter.service';
import { QueryParamsCoverLetterDto } from './dto/coverletter-list.dto';
import { CreateCoverLetterDto } from './dto/create-coverletter.dto';
import { UpdateCoverLetterDto } from './dto/update-coverletter.dto';

@ApiTags('coverletters')
@ApiBearerAuth()
@UseGuards(TokenAuthGuard)
@Controller('resume/coverletters')
export class CoverLetterController {
    constructor(private coverLetterService: CoverLetterService) {}

    @Get()
    async findAll(@Auth() auth, @Query() qry: QueryParamsCoverLetterDto) {
        const { data, metadata } = await this.coverLetterService.findAll(auth, qry);
        return { data: data, metadata: metadata };
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        return { data: await this.coverLetterService.findById(id) };
    }

    @HttpCode(200)
    @Post()
    async create(@Auth() auth, @Body() createParamsDto: CreateCoverLetterDto): Promise<HttpResponse> {
        const result = await this.coverLetterService.create(auth, createParamsDto);
        return { data: result }
    }

    @Put(':id')
    async update(@Auth() auth, @Param('id') id: string, @Body() updateUserDto: UpdateCoverLetterDto): Promise<HttpResponse> {
        const result = await this.coverLetterService.update(auth, id, updateUserDto);
        return { data: result };
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.coverLetterService.remove(id);
    }
}
