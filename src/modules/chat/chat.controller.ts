
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HttpResponse } from './../../common/http/response';
import { Auth } from 'src/common/decorators/authGuard.decorator';
import { TokenAuthGuard } from 'src/common/guards/auth.guard';
import { ChatService } from './chat.service';
import { RequestChatDto } from './dto/Request.dto';

@ApiTags('chat')
@UseGuards(TokenAuthGuard)
@Controller('chat')
export class ChatController {
    constructor(private chatService: ChatService) {}

    @Post('/request')
    async profile(@Auth() auth: any, @Body() payload: RequestChatDto): Promise<HttpResponse> {
        console.log('Auth: ', auth);
        const result = await this.chatService.createChatRequest(auth._id, payload);
        return {
            data: result
        }
    }
}
