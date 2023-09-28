import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCoverLetterDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    introContent: string;

    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty()
    content: string;

    @ApiPropertyOptional()
    @IsMongoId()
    @IsOptional()
    template: string;
}
