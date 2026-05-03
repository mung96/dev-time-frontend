import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { ValidationException } from 'src/global/exception/validation.exception';
import { ServiceApiResponse } from 'src/global/service-api-response';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof ValidationException) {
      return response
        .status(400)
        .json(ServiceApiResponse.fail(exception.message));
    }

    // TODO: 404등등 추가 처리 필요
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
