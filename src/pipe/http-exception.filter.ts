import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { Request, Response } from "express";

//handle all exceptions
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

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

        httpAdapter.reply(response, responseBody, HttpStatus);
    }
}