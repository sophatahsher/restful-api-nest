import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

const encrypt = (str: string, method: string) => {
    let hash = crypto.createHash(method).update(str).digest('hex');
    return hash;
};

const hashStringWithSalt = (str: string, saltLength: number) => {
    const salt = bcrypt.genSaltSync(saltLength);
    const hash = bcrypt.hashSync(str, salt);
    return hash;
};

const generatePages = (qry: any) => {
    let page = parseInt(qry.page || 1);
    let limit = parseInt(qry.limit || 10);

    let offset = (page - 1) * limit;
    if (offset < 0) {
        offset = 0;
    }

    return {
        offset: offset,
        limit: limit,
        page: page
    };
};

const sortArrayObject = (o: any) => {
    var sorted = {},
        key = null,
        a = [];

    for (key in o) {
        if (o.hasOwnProperty(key)) {
            a.push(key);
        }
    }

    a.sort();

    for (key = 0; key < a.length; key++) {
        sorted[a[key]] = o[a[key]];
    }
    return sorted;
};

export {
    encrypt,
    hashStringWithSalt,
    generatePages,
    sortArrayObject
};
