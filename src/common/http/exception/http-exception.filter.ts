import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const customException: any = exception;
        console.log('HttpExceptionFilter=======',customException.response);
        if (exception instanceof HttpException) {
            console.log('HttpExceptionFilter 1=======',exception.getStatus());
            if( typeof customException.response.message !== 'object' ) {
                response.status(status).json({
                    status: customException.response.status,
                    timestamp: new Date().toISOString(),
                    code: customException.response.errorCode,
                    statusCode: customException.response.statusCode,
                    errorMessage: customException.response.errorMessage || exception.message,
                    request: { 
                        url: request.url, 
                        method: request.method
                    }
                });
            }
            else {
                response.status(status).json({
                    status: 'FAILED',
                    timestamp: new Date().toISOString(),
                    code: customException.response.statusCode,
                    statusCode: customException.response.statusCode,
                    errorMessage: customException.response.error,
                    error: customException.response.message,
                    request: { 
                        url: request.url, 
                        method: request.method
                    }
                });
            }
            
        } else {
            console.log('HttpExceptionFilter 2=======',customException.response);
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: customException.response.errorCode,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                timestamp: new Date().toISOString(),
                code: customException.response.errorCode,
                errorMessage: 'Internal server error'
            });
        } 
    }
}
