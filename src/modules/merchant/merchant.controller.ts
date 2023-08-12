
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HttpResponse } from './../../common/http/response';
import { Auth } from 'src/common/decorators/authGuard.decorator';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';
import { MerchantService } from './merchant.service';

@ApiTags('merchants')
@UseGuards(JwtAuthGuard)
@Controller('merchants')
export class MerchantController {
    constructor(private service: MerchantService) {}

    @Get('/profile')
    async profile(@Auth() auth: any): Promise<HttpResponse> {
        const result = await this.service.findOne(auth._id);
        return {
            data: result
        }
    }
}
