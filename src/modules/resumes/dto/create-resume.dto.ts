import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsDate, IsEmail, IsEnum, IsIn, IsMongoId, IsNotEmpty, IsNumber, IsObject, IsOctal, IsOptional, IsString, Max, MaxLength, Min, ValidateNested } from 'class-validator';
import { FrequencyPayment, GenderEnum, LanguageLevelEnum } from '../enums/resume.enum';

class EducationDegree {
    @ApiProperty()
    @IsMongoId()
    id: string

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(64)
    name: string;
}

class Education {
    @ApiProperty()
    @IsMongoId()
    @IsOptional()
    id: string

    @ApiProperty()
    @ValidateNested({ each: true })
    @Type(()=> EducationDegree)
    degree: EducationDegree;

    @ApiProperty()
    //@IsMongoId()
    @IsNotEmpty()
    school: string;

    @ApiProperty()
    //@IsMongoId()
    specialization: string;

    @ApiPropertyOptional()
    @IsOptional()
    finalGrade: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    scoreType: string;

    @ApiPropertyOptional()
    city: string;

    @ApiPropertyOptional()
    @IsOptional()
    state: string;

    @ApiProperty()
    country: string;

    @ApiProperty()
    @IsNotEmpty()
    location: string;

    @ApiProperty()
    @IsDate()
    startedAt: Date;

    @ApiProperty()
    @IsDate()
    endedAt: Date;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    description: string;
}

class Skill {
    @ApiProperty()
    @IsMongoId()
    id: string;

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(64)
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @Min(5)
    @Max(100)
    score: number;
}

class SpokenLanguage {
    @ApiProperty()
    @IsMongoId()
    @IsOptional()
    id: string;

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(64)
    name: string;

    @ApiProperty({ enum: LanguageLevelEnum})
    @IsEnum(LanguageLevelEnum)
    @ValidateNested()
    level: LanguageLevelEnum;
}

class Experience {

    @ApiProperty()
    @IsMongoId()
    position: string

    @ApiProperty()
    //@IsMongoId()
    @IsString()
    company: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    salary: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    salaryLessThan: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    salaryGreaterThan: string;

    @ApiPropertyOptional()
    @IsMongoId()
    @IsOptional()
    currency: string;

    @ApiPropertyOptional({ enum: FrequencyPayment})
    @IsEnum(FrequencyPayment)
    frequency: FrequencyPayment;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    startedAt: Date;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    endedAt: Date;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    city: string;

    @ApiPropertyOptional()
    state: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    country: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    location: string;

    @ApiProperty({ default: false })
    isCurrentEmployed: boolean;
}

class EmergencyContact {
    @ApiProperty({ default: 1 })
    @IsNumber()
    id: number;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    relationship: string;

    @ApiProperty({ enum: GenderEnum })
    @IsEnum(GenderEnum)
    gender: GenderEnum;

    @ApiPropertyOptional()
    dob: Date;

    @ApiProperty()
    @IsString()
    phoneNumber: string;

    @ApiProperty()
    @IsString()
    officeNumber: string;

    @ApiPropertyOptional()
    @IsString()
    email: string;

    @ApiProperty()
    @IsString()
    address: string;
}

export class CreateAppUserResumeDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @ApiProperty()
    @IsString()
    lastName: string;

    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty()
    personal: string;

    @ApiPropertyOptional()
    @IsString()
    phone: string;

    @ApiPropertyOptional()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(()=> Education)
    education: Education;
    
    @ApiProperty()
    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(()=> Skill)
    skills: Skill;

    @ApiProperty()
    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(()=> SpokenLanguage)
    languages: SpokenLanguage;

    @ApiProperty()
    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(()=> Experience)
    experience: Experience;

    // @ApiPropertyOptional()
    // @IsArray()
    // @Type(()=> EmergencyContact)
    // emergencyContact: EmergencyContact;

    // @ApiPropertyOptional({ required: false})
    // @IsObject()
    // @IsOptional()
    // additionalInfo: object

    @ApiProperty()
    @IsMongoId()
    @IsOptional()
    template: string;

    @ApiProperty({ default: true })
    @IsBoolean()
    isPublish: boolean;
}
