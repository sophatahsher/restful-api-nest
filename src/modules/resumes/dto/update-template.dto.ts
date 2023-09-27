import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TemplateEnum } from '../enums/resume.enum';

export class UpdateResumeTemplateDto {
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

    @ApiProperty({ enum: TemplateEnum})
    @IsEnum(TemplateEnum)
    type: TemplateEnum;
}
