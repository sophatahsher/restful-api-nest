import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {

    @ApiProperty()
    @IsString()
    firstName: string;

    @ApiProperty()
    @IsString()
    lastName: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    phoneNumber: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    email: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    username: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    password: string; 

    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional()
    status: number;
}
