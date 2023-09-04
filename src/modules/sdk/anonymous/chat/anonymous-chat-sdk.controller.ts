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
import { SendRequestChatDto } from './dto/SendRequestChat.dto';

@ApiTags('chat')
@Controller('anonymous-sdk/chat')
export class AnonymousChatSdkController {
    constructor(private chatService: ChatService) {
    }

    // PerformBy: Anonymous User
    @Post('/thread/request/send')
    async sendChatRequest(
        @Body() param: SendRequestChatDto
    ): Promise<HttpResponse> {
        console.log('param: ', param);
        //const result = await this.chatService.deleteChatThreadRequest(id);
        return {
            data: []
        };
    }
}
