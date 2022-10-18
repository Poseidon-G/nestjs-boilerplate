import { ExceptionFilter, Catch, ArgumentsHost, HttpException, LoggerService, Inject } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

import { HttpAdapterHost } from "@nestjs/core";
import { Request, Response } from "express";

//handle all exceptions
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(
        private readonly httpAdapterHost: HttpAdapterHost,
        private readonly logger: LoggerService
    ) { }
    catch(exception: unknown, host: ArgumentsHost): void {
        const { httpAdapter } = this.httpAdapterHost;
        const context = host.switchToHttp();
        const HttpStatus = exception instanceof HttpException ? exception.getStatus() : 500;

        const response = context.getResponse<Response>();
        const request = context.getRequest<Request>();

        const responseBody = {
            statusCode: HttpStatus,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: exception instanceof HttpException ? exception.message : "Internal Server Error",
        };

        if (HttpStatus === 500) {
            this.logger.error(exception);
        }
        httpAdapter.reply(response, responseBody, HttpStatus);
    }
}