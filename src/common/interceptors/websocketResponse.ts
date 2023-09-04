import {
    Logger,
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
    status: string;
    error?: T;
    data?: T;
}

@Injectable()
export class WebsocketResponseInterceptor<T>
    implements NestInterceptor<T, Response<T>>
{
    intercept(
        context: ExecutionContext,
        next: CallHandler
    ): Observable<Response<T>> {
        console.log('Before...');
        const req = context.switchToWs().getData();
        const method = req.method;
        const url = req.url;
        console.log(`Method: ${method}, URL: ${url}`);
        const now = Date.now();

        return next.handle().pipe(
            map((res) => {
                Logger.log(
                    `${method} ${url} ${Date.now() - now}ms`,
                    context.getClass().name
                );
                console.log('After...');
                return res?.error
                    ? { status: 'error', error: res.error.message }
                    : { status: 'success', data: res.data };
            })
        );
    }
}
