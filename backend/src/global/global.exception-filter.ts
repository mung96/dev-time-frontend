import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { DataAccessException } from 'src/common/exception/data-access.exception';
import { ValidationException } from 'src/common/exception/validation.exception';
import { ServiceApiResponse } from 'src/global/service-api-response';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof ValidationException) {
      if (exception.logMessage) {
        this.logger.warn(exception.logMessage);
      }
      return response
        .status(400)
        .json(ServiceApiResponse.fail(exception.message));
    }

    if (exception instanceof DataAccessException) {
      this.logger.error(exception.message, (exception as Error).stack);
      return response
        .status(500)
        .json(ServiceApiResponse.fail('데이터 처리 중 오류가 발생했습니다.'));
    }

    // NestJS 내부 예외 (ValidationPipe 등)
    if (exception instanceof HttpException) {
      return response
        .status(exception.getStatus())
        .json(ServiceApiResponse.fail(exception.message));
    }

    this.logger.error(exception);
    response
      .status(500)
      .json(ServiceApiResponse.fail('서버 오류가 발생했습니다.'));
  }
}
