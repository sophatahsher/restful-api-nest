
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { HttpResponse } from 'src/common/http/response';
import { Auth } from 'src/common/decorators/authGuard.decorator';
import { ClientAuthGuard } from 'src/common/guards/client-auth.guard';
import { MerchantService } from 'src/modules/merchant/merchant.service';

@ApiTags('merchants')
@ApiSecurity('apiKey')
@UseGuards(ClientAuthGuard)
@Controller('client-auth/merchants')
export class ClientAuthMerchantController {
    constructor(private service: MerchantService) {}

    @Get('/profile')
    async profile(@Auth() auth: any): Promise<HttpResponse> {
        const result = await this.service.findOne(auth._id);
        return {
            data: result
        }
    }
}
