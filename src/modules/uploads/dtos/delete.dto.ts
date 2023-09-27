import { ApiProperty } from '@nestjs/swagger';
export class DeleteParamDto {
    @ApiProperty({ type: 'string', required: true })
    url: string;
}
