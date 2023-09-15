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
        console.log('HttpExceptionFilter=======',exception.getStatus());
        if (exception instanceof HttpException) {
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
        } else {
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
