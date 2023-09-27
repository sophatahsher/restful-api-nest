import * as fs from "node:fs/promises";
import { fileFromSync } from "node-fetch";
import { stat } from "node:fs";
import { HttpException, HttpStatus } from "@nestjs/common";

// File Server Storage Service
export class FS3Sdk {
    config = {
        endpoint: "",
        siteName: "",
        version: "",
        pubKey: ""
    }

    // static endpoint: string;
    // static siteName: string;
    // static version: string;
    // static pubKey: any;

    //constructor(config: any) {
    constructor() {
        // this.config.endpoint = config?.endpoint;
        // this.config.siteName = config?.siteName;
        // this.config.pubKey = config?.pubKey;
    }

    async fileExistSync(filepath: string) {
        try {
            const stats = await fs.stat(filepath)
            return stats.isFile();
        } catch {
            return false;
        }
    }

    async upload(file: any, path: string, option: any) {
        let status;
        try {

            const filename = "";
            const fileBlob = "";
            const destDir   = option?.destDir
            console.log('fileExistSync', await this.fileExistSync(path + '/'));

            // check ExistFile
            if( !await this.fileExistSync(path) )
                throw new HandleError(false, 404, 'File does not exist')

            /*
            // upload with SDK
            const encryptionFile = '';

            // append file in FormData
            const body = new FormData();
            body.append(filename, fileFromSync(path), fileBlob)
            const postUrl = `${this.config.endpoint}/${this.config.siteName}/${encryptionFile}?option=${option}`;
            const res: any = await fetch(postUrl, { method: "POST", body: body })

            if(res.code == 0) {
                status = true;
            } else {
                status = false;
            }
            */

            const fileUrl = path;
            return { url: fileUrl, file: file };

        } catch (err) {
            console.log('Error Exception : ', err);

            let error
            if ( err.code > 0 ) {
                switch (err.code) {
                    case 401:
                        error = {};
                        break;
                    case 400:
                        error = {};
                        break;
                    case 403:
                        error = {};
                        break;
                    case 500:
                        error = {};
                        break;
                    default:
                        error = {};
                }
                return status(err.ErrorCode).json(error);
            } else {

            }
        }
    }
}

export class HandleError {
    constructor(status: boolean = false, code: number, message: string) {}
}