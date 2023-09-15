import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString, IsOptional } from 'class-validator';

export class QueryParamsDto {

    @ApiPropertyOptional()
    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    limit?: number;

    @ApiPropertyOptional()
    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    offset?: number;

    @ApiPropertyOptional()
    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    page?: number;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    search?: string;
}
