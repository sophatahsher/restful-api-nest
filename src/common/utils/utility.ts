import { IPagination } from '../interfaces/pagination';

const generatePages = (query): IPagination => {
    let page = parseInt(query.page || 1);
    let limit = parseInt(query.limit || 10);

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

const stringContext = (str: string, mapObj: any) => {
    let newStr = str.replace(/var1|var2|var3/gi, function(matched){
        return mapObj[matched];
    });
    return newStr
}

export { generatePages, stringContext };
