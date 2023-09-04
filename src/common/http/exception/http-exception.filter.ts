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
        //const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const customException: any = exception;
        if (exception instanceof HttpException) {
            response.status(status).json({
                status: customException.response.errorCode,
                statusCode: status,
                timestamp: new Date().toISOString(),
                errorCode: customException.response.errorCode,
                code: customException.response.errorCode,
                //path: request.url,
                errorMessage:
                    customException.response.errorMessage || exception.message
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

        //return { status: 'OK', code: 0, errorMessage: null };
    }
}
