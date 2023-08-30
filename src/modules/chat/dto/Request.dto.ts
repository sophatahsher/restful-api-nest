import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RequestChatDto {
    @ApiProperty()
    @IsString()
    recipient: string;
}
