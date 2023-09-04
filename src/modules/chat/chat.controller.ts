import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HttpResponse } from './../../common/http/response';
import { Auth } from 'src/common/decorators/authGuard.decorator';
import { TokenAuthGuard } from 'src/common/guards/auth.guard';
import { ChatService } from './chat.service';
import { RequestChatDto } from './dto/Request.dto';
import { RequestThreadDto } from './dto/RequestThread.dto';
import { DeleteRequestThreadDto } from './dto/DeleteRequestThread.dto';
import { FindRequestThreadDto } from './dto/FindRequestThread.dto copy';
import { RequestChatService } from './request.service';
import { generatePages } from 'src/common/utils/utility';
import { FindRequestChatQueryDto } from './dto/FindChatRequests.dto';

@ApiTags('chat')
@ApiBearerAuth()
@UseGuards(TokenAuthGuard)
@Controller('chat')
export class ChatController {
    constructor(
        private chatService: ChatService,
        private requestChatService: RequestChatService
    ) {}
    
    @Get('/thread/request')
    async findAllChatRequests(
        @Auth() auth: any,
        @Query() query: FindRequestChatQueryDto
    ): Promise<HttpResponse> {
        console.log('auth: ', auth);
        const pagination = generatePages(query);
        const { data: result, totalRecords } = await this.requestChatService.findAllChatRequests(
            auth,
            query,
            pagination
        );
        return {
            data: result,
            meta: { totalRecords, ...pagination } || {}
        };
    }

    @Post('/thread/request')
    async createChatThreadRequest(
        @Body() request: RequestThreadDto
    ): Promise<HttpResponse> {
        console.log('request: ', request);
        const result = await this.chatService.createChatThreadRequest(request);
        return {
            data: result
        };
    }

    @Get('/thread/request/:id')
    async findChatThreadRequestById(
        @Param('id') id: FindRequestThreadDto
    ): Promise<HttpResponse> {
        console.log('id: ', id);
        const result = await this.chatService.findChatThreadRequestById(id);
        return {
            data: result
        };
    }

    // Only AdminRole
    @Delete('/thread/request/:id')
    async deleteChatThreadRequest(
        @Param('id') id: DeleteRequestThreadDto
    ): Promise<HttpResponse> {
        console.log('id: ', id);
        const result = await this.chatService.deleteChatThreadRequest(id);
        return {
            data: result
        };
    }

    // Only AdminRole
    @Put('/thread/request/accept/:id')
    async acceptChatThreadRequest(
        @Param('id') id: DeleteRequestThreadDto
    ): Promise<HttpResponse> {
        console.log('id: ', id);
        const result = await this.chatService.deleteChatThreadRequest(id);
        return {
            data: result
        };
    }

    @Post('/request')
    async createChatRequest(
        @Auth() auth: any,
        @Body() payload: RequestChatDto
    ): Promise<HttpResponse> {
        console.log('Auth: ', auth);
        const result = await this.chatService.createChatRequest(
            auth._id,
            payload
        );
        return {
            data: result
        };
    }
}
