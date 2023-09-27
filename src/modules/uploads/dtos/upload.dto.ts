import { ApiProperty } from '@nestjs/swagger';
export class UploadBodyDto {
    @ApiProperty({ type: 'string', format: 'binary', required: true })
    file: Express.Multer.File;
}
