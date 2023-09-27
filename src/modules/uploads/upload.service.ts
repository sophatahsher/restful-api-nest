import { Injectable, InternalServerErrorException, Logger, BadRequestException, Inject, HttpException, HttpStatus } from '@nestjs/common';
import * as fs from 'fs';
import { FS3Sdk } from 'src/libs/upload';

const logger = new Logger('UploadService');

@Injectable()
export class UploadService {

    endpoint: string;
    siteName: string;
    version: string;
    pubKey: any;

    constructor() {
        this.endpoint = process.env.UPLOAD_ENDPOINT;
        this.siteName = process.env.UPLOAD_SITE_NAME;
        this.version = process.env.UPLOAD_VERSION;
        this.pubKey = process.env.UPLOAD_PUB_KEY;
    }
    
    async uploadSingleFile(file: Express.Multer.File) {
        try {
            // check exist temp store path
            const tempDir = await this.getTempDir('temp')
            const filename = file.originalname;
            let fileImg: any = file.buffer;
            let imageBuffer = Buffer.from(fileImg, 'base64');

            // save file into temp folder
            fs.writeFileSync(tempDir + '/' + filename, imageBuffer);
            const path = tempDir + '/' + filename;

            // 
            const upSdk = new FS3Sdk();
            upSdk.config.endpoint = this.endpoint;
            upSdk.config.siteName = this.siteName;
            upSdk.config.version = this.version;
            upSdk.config.pubKey = this.pubKey;

            const options = { tempDir: 'uploads' }

            // 
            const res = await upSdk.upload(filename, path, options)
            console.log('UploadService > res : ', res);
            if (res) {

                // unlink file from temp
                if(await upSdk.fileExistSync(path))
                    fs.unlinkSync(path);
                return res;
            } else {
                logger.error(res)
                throw new HttpException("Error", HttpStatus.INTERNAL_SERVER_ERROR);
            } 
        } catch (err) {
            console.log('UploadService > UploadSingleFile() : ', err.message);
            return ''
        }
    }

    async uploadWithMultipleFiles(files:  Array<Express.Multer.File>) {
        try {
            //const filename = files.originalname;
            //let fileImg: any = files.buffer;
            //let imageBuffer = Buffer.from(fileImg, 'base64');
            const tempDir = `${process.cwd()}/temp`;
            if (!fs.existsSync(tempDir)) {
                fs.mkdirSync(tempDir, { recursive: true});
            }
            /*
            // unlink file from temp store
            if(await sdk.fileExists(filePath))
                fs.unlinkSync(filePath);

            if (!result) {
                logger.error(result)
                throw new InternalServerErrorException(result.getMessage());
            } else {
                return result.url; 
            } 
            */
        } catch (err) {
            console.log('uploadWithMultipleFiles > deleteFile() : ', err);
            return ''
        }
    }

    async deleteFile(url) {
        try {
            
        } catch (err) {
            console.log('UploadService > deleteFile() : ', err);
            throw new BadRequestException(String(err));
        }
    }

    private async getTempDir(path: string) {
        console.log(process.cwd());
        console.log(path);
        const tempDir = `${process.cwd()}/${path}`;
        console.log(tempDir);
        if (!fs.existsSync(tempDir)) 
            fs.mkdirSync(tempDir, { recursive: true});
        return tempDir;
    }
}
