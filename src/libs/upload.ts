import { encrypt } from 'src/common/utils/encryption';
import * as fs from "node:fs/promises";
import { fileFromSync } from "node-fetch";
import { stat } from "node:fs";
import { HttpException, HttpStatus } from "@nestjs/common";
import * as forge from 'node-forge';
import { createCipheriv, randomBytes, scrypt } from 'crypto';
import { v4 as uuid } from 'uuid';

const dynamicImport = async (packageName: string) => new Function(`return import('${packageName}')`)();

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
        const nodeFetch = await dynamicImport('node-fetch');
        const fs = await dynamicImport('node:fs');
        const fetch = nodeFetch.default;
        const fileFromSync: any = nodeFetch.fileFromSync;
        const FormData = nodeFetch.FormData;
        let status;

        try {
            const filename = file.originalname;
            const suffix = new Date().getTime();
            const destDir   = option?.destDir
            //console.log('suffix======', suffix);
            // check ExistFile
            if( !await this.fileExistSync(path) )
                throw new HandleError(false, 404, 'File does not exist')
            
            //console.log('fileExistSync======', await this.fileExistSync(path));
            /*
            const sha256 = forge.sha256.create();
            const readStream = fs.createReadStream(path, { highWaterMark: 1 * 1024 });

            console.log('readStream======', readStream);
            const hashData = sha256.digest().getBytes()

            const hashStr = forge.util.bytesToHex(hashData)
            const publicKey = forge.pki.publicKeyFromPem(this.config.pubKey)

            const encrypted = publicKey.encrypt(forge.util.createBuffer(hashStr).getBytes(), 'RSA-OAEP', {
                md: forge.md.sha256.create(),
                mgf1: {
                    md: forge.md.sha256.create()
                }
            });
            const base64Str = forge.util.encode64(encrypted)
            const encryptionFile = encodeURI(encodeURI(base64Str))
            console.log('encryptionFile======', encryptionFile);
            */

            // const signature = crypto.sign(crypto.sign("sha256", Buffer.from(verifiableData), {
            //     key: this.config.pubKey,
            //     padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
            // })
            const sha256 = forge.sha256.create();
            //console.log('sha256======', sha256);
            const byteData = sha256.digest().getBytes()
            //console.log('byteData======', byteData);
            const hashStr = forge.util.bytesToHex(byteData)
            //console.log('hashStr======', hashStr);
            const pubKey = await forge.pki.publicKeyFromPem(this.config.pubKey);

            const encryptedFile = this.encrypt(pubKey, hashStr);
            const encodeBase64 = forge.util.encode64(encryptedFile);
            const base64Url = encodeURI(encodeBase64);
            //console.log('base64Url======', base64Url);
            
            // append file in FormData
            const body = new FormData();
            body.append(filename, fileFromSync(path), `${filename}_${suffix}`)
            const postUrl = `${this.config.endpoint}/${this.config.siteName}/${base64Url}?upload_dir=${option.tempDir}`;
            const res: any = await fetch(postUrl, { method: "POST", body: body })
            //console.log('======', res);
            
            // if(res.code == 0) {
            //     status = true;
            // } else {
            //     status = false;
            // }
            
            const fileUrl = path;
            return { url: fileUrl, file: file };

        } catch (err) {
            console.log('Error Exception : ', err.message);

            // let error
            // if ( err.code > 0 ) {
            //     switch (err.code) {
            //         case 401:
            //             error = {};
            //             break;
            //         case 400:
            //             error = {};
            //             break;
            //         case 403:
            //             error = {};
            //             break;
            //         case 500:
            //             error = {};
            //             break;
            //         default:
            //             error = {};
            //     }
            //     return status(err.ErrorCode).json(error);
            // } else {

            // }
        }
    }

    private encrypt(key, hash)
    {
        // generate openssl key:
        // https://kentakodashima.medium.com/generate-pem-keys-with-openssl-on-macos-ecac55791373
        return key.encrypt(
            forge.util.createBuffer(hash).getByte(),
            'RSA-OAEP',
            {
                md: forge.md.sha256.create(),
                mgf1: {
                    md: forge.md.sha256.create()
                }
            }
        )
    }

    /*
    private encrypt(data) {
        const encryptedData = crypto.publicEncrypt(
            {
                key: this.config.pubKey,
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: "sha256",
            },
            // We convert the data string to a buffer using `Buffer.from`
            Buffer.from(data)
        );

        return encryptedData.toString("base64");
    }

    private signData() {
        // Create some sample data that we want to sign
        const verifiableData = "this need to be verified";

        // The signature method takes the data we want to sign, the
        // hashing algorithm, and the padding scheme, and generates
        // a signature in the form of bytes
        const signature = crypto.sign("sha256", Buffer.from(verifiableData), {
        key: this.config.pubKey,
        padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
        });

        return signature.toString("base64")
    }
    */
}

export class HandleError {
    constructor(status: boolean = false, code: number, message: string) {}
}