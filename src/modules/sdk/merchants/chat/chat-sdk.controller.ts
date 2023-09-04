import {
    Controller,
    Get,
    Param,
    Body,
    Query,
    UseGuards,
    Put,
    Post
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { MerchantAuth } from 'src/common/decorators/authMerchantGuard.decorator';
import { ChatService } from 'src/modules/chat/chat.service';
import { HttpResponse } from 'src/common/http/response';
import { MerchantAuthGuard } from 'src/common/guards/merchant-auth.guard';
import { AcceptChatRequestThreadDto } from './dto/Accept.dto';

@ApiTags('chat')
@ApiSecurity('apiKey')
@UseGuards(MerchantAuthGuard)
@Controller('merchant-sdk/chat')
export class MerchantChatSdkController {
    constructor(private chatService: ChatService) {
        console.log('merchant-sdk/chat=========');
    }

    @Get('/thread/request')
    async getChatThreadRequest(
        @MerchantAuth() merchantAuth: any,
        @Query() query: any
    ): Promise<HttpResponse> {
        console.log('query=========', query);
        //const result = await this.service.findOne(auth._id);
        return {
            data: {}
        };
    }

    // PerformBy: Only Merchant
    @Post('/thread/request/accept')
    async acceptChatThreadRequest(
        @MerchantAuth() merchantAuth,
        @Body() param: AcceptChatRequestThreadDto
    ): Promise<HttpResponse> {
        console.log('merchant: ', merchantAuth);
        console.log('id: ', param);
        //const result = await this.chatService.deleteChatThreadRequest(id);
        return {
            data: []
        };
    }
}
