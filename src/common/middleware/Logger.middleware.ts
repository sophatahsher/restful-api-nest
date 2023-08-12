import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private logger = new Logger('HTTP');

    use(request: Request, response: Response, next: NextFunction): void {
        this.logger.log(`\nMETHOD: ${request.method},\nURL: ${request.originalUrl}`);
        this.logger.log(`Request Body: \n${JSON.stringify(request.body, null, 2)}`);
        this.logger.log(`Response Status: \n${response.statusCode}`);
        if (next) next();
    }
}
