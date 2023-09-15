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
import { UserService } from './user.service';
import { CreateAppUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryParamsDto } from './dto/list.dto';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(TokenAuthGuard)
@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    async findAll(@Query() qry: QueryParamsDto) {
        const { data, metadata } = await this.userService.findAll(qry);
        return { data: data, metadata: metadata };
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        return { data: await this.userService.findById(id) };
    }

    @HttpCode(200)
    @Post()
    async create(@Body() createUserDto: CreateAppUserDto): Promise<HttpResponse> {
        const result = await this.userService.create(createUserDto);
        return { data: result }
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<HttpResponse> {
        const result = await this.userService.update(id, updateUserDto);
        return { data: result };
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.userService.remove(id);
    }
}
