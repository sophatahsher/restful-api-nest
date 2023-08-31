import { Logger, Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpResponse } from '../http/response';

export interface Response<T> {
    statusCode: number;
    data: T;
}

@Injectable()
export class HttpResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
        //console.log('Before...');
        const req = context.switchToHttp().getRequest();
        const method = req.method;
        const url = req.url;
        const now = Date.now();
        
        Logger.log(`${method} ${url} ${Date.now() - now}ms`, context.getClass().name,);
        
        return next.handle().pipe(
            map((httpResponse: any) => {
                    if( typeof typeof httpResponse.data === 'string' )
                        return { status: 'OK', code: 0 };
                    return httpResponse;
                }),
            );

        // return next.handle().pipe(
        //     map((data: HttpResponse) => ({
        //         //statusCode: context.switchToHttp().getResponse().statusCode,
        //         ...data
        //     }))
        // );
    }
}
