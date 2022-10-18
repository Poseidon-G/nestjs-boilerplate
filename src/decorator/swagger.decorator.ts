import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from "@nestjs/swagger"

export function ApiResponseCustom(errorCode: any) {
    const options = {
        status: errorCode.statusCode,
        description: errorCode.message,
    }
    return applyDecorators(
        ApiResponse(options)
    );
}