import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        //const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const customException:any = exception;
        if (exception instanceof HttpException) {
            response.status(status).json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                errorCode: customException.response.errorCode,
                //path: request.url,
                errorMessage: customException.response.errorMessage || exception.message,
            });
        } else {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Internal server error',
            });
        }
    }
}