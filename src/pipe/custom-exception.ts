import { HttpException } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor(errorCode: any, message?: string) {
    super(
      {
        statusCode: errorCode.statusCode,
        message: message || errorCode.message,
      },
      errorCode.statusCode,
    );
  }
}
