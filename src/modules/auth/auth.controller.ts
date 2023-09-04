import {
    Controller,
    Post,
    Body,
    ValidationPipe,
    UseGuards,
    Put,
    Get
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators/authGuard.decorator';
import { TokenAuthGuard } from 'src/common/guards/auth.guard';
import { HttpResponse } from 'src/common/http/response';
import { AuthService } from './auth.service';
import { LoginBodyDto } from './dto/login';
import { ChangePasswordBodyDto } from './dto/change-password';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private service: AuthService) {}

    @Post('/login')
    async loginUser(@Body() body: LoginBodyDto): Promise<HttpResponse> {
        const result = await this.service.loginUser(body);
        return {
            data: result
        };
    }

    @Get('/refresh')
    async refreshUserToken(@Body() body: LoginBodyDto): Promise<HttpResponse> {
        const result = await this.service.loginUser(body);
        return {
            data: result
        };
    }

    @ApiBearerAuth()
    @UseGuards(TokenAuthGuard)
    @Put('/change-password')
    async changeUserPassword(
        @Auth() auth: any,
        @Body() body: ChangePasswordBodyDto
    ) {
        const result = await this.service.changeUserPassword(auth._id, body);
        return {
            data: result
        };
    }
}
