import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

const baseSchema = {
  properties: {
    success: { type: 'boolean', example: true },
    message: { type: 'string' },
  },
  required: ['success', 'message'],
};

export const ApiServiceResponse = <T extends Type<unknown>>(dataType?: T) =>
  dataType
    ? applyDecorators(
        ApiExtraModels(dataType),
        ApiOkResponse({
          schema: {
            allOf: [baseSchema, { $ref: getSchemaPath(dataType) }],
          },
        }),
      )
    : applyDecorators(ApiOkResponse({ schema: baseSchema }));
