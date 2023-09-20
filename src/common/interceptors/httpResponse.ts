import {
    Logger,
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpResponse } from '../http/response';

export interface Response<T> {
    data: T;
}

export type ResponseJson ={
    status: string,
    code: number,
    message: string
    data: object | any,
    request: {
        url: string,
        method: string
    }
}

export interface SuccessResponse  {
    status: string,
    code: number,
    message: string
    data: object | any,
    request: {
      url: string,
      method: string
    }
}

export type ErrorResponse = {
    status: string,
    code: number,
    message: string,
    error: object | any,
    request: {
        url: string,
        method: string
    }
}

@Injectable()
export class HttpResponseInterceptor<T>
    implements NestInterceptor<T, Response<T>>
{
    intercept(
        context: ExecutionContext,
        next: CallHandler
    ): Observable<Response<T>> {
        //console.log('Before...');
        const req = context.switchToHttp().getRequest();
        const method = req.method;
        const url = req.url;
        const now = Date.now();
        Logger.log(
            `${method} ${url} ${Date.now() - now}ms`,
            context.getClass().name
        );

        return next.handle().pipe(
            map((httpResponse) => {
                console.log('httpResponse=======', httpResponse);
                if ( typeof httpResponse === 'object' ) {
                    if ( httpResponse.data === 'OK' && ( httpResponse.data !== 'OK' || !httpResponse.metadata ) ) 
                        return { 
                            status: 'OK', 
                            code: 0, 
                            /*request: { 
                                 url: url, 
                                 method: method
                            }*/
                        };
                    else 
                    {
                        return { 
                            status: 'OK', 
                            code: 0, 
                            ...httpResponse,
                            /*request: { 
                                url: url, 
                                method: method
                            }*/
                        };
                    }
                        
                }
                    
                return { status: 'OK', code: 0, ...httpResponse };
            })
        );
    }
}
