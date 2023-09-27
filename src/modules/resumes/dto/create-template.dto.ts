import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsDate, IsEnum, IsIn, IsMongoId, IsNotEmpty, IsNumber, IsObject, IsOctal, IsOptional, IsString, Max, MaxLength, Min, ValidateNested } from 'class-validator';
import { FrequencyPayment, GenderEnum, LanguageLevelEnum, TemplateEnum } from '../enums/resume.enum';

export class CreateResumeTemplateDto {
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
