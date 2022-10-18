import { HttpException, LoggerService } from '@nestjs/common';

export class CustomException extends HttpException {
    private readonly logger: LoggerService;

    constructor(errorCode: any, message?: string) {
        super(
            {
                statusCode: errorCode.statusCode,
                message: message || errorCode.message,
            },
            errorCode.statusCode,
        );

        if (errorCode.statusCode === 500) {
            this.logger.error(message);
        }

    }
}