import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteRequestThreadDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    id: string;
}
