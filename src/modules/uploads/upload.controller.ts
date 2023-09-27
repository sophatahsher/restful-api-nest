import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
    UseGuards,
    BadRequestException,
    Param,
    Delete,
    ParseFilePipe,
    MaxFileSizeValidator,
    FileTypeValidator,
    UploadedFiles
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { DeleteParamDto } from './dtos/delete.dto';
import { TokenAuthGuard } from 'src/common/guards/auth.guard';

@ApiTags('uploads')
@ApiBearerAuth()
@UseGuards(TokenAuthGuard)
@Controller('file')
export class UploadController {
    constructor(private readonly uploadService: UploadService) {}

    // SingleUpload
    @Post('/upload')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary'
                }
            }
        }
    })
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 90000 }),
                    //new FileTypeValidator({ fileType: 'image/*' }),
                    new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
                ],
            })
        ) file: Express.Multer.File
    ) {

        //if (!file) throw new BadRequestException('Request upload not allowed with empty.');
        return {
            //file: file.buffer.toString()
            data: await this.uploadService.uploadSingleFile(file)
        };
    }

    // MultipleUpload
    @Post('/uploads')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary'
                }
            }
        }
    })
    @UseInterceptors(FileInterceptor('files'))
    async uploadFiles(
        @UploadedFiles(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 1000 }),
                    new FileTypeValidator({ fileType: 'image/jpeg' }),
                ],
            })
        ) files: Array<Express.Multer.File>
    ) {
        //if (!file) throw new BadRequestException('Request upload not allowed with empty.');
        return {
            data: await this.uploadService.uploadWithMultipleFiles(files)
        };
    }

    @Delete('/delete/:fileUrl')
    async deleteFile(@Param('fileUrl') fileUrl: string) {
        return {
            data: await this.uploadService.deleteFile(fileUrl)
        };
    }
}

// ref:
// https://docs.nestjs.com/techniques/file-upload
