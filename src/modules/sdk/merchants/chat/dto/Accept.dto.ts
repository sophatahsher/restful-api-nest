import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AcceptChatRequestThreadDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    id: string;
}
