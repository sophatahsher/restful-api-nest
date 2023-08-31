import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RequestThreadDto {

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    categoryId: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    subject: string;
}
