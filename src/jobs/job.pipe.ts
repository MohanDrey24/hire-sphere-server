import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ZodSchema, ZodError } from 'zod';

type NullableField = string | undefined;

interface ValidationError {
  field: NullableField;
  message: string;
}

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      return this.schema.parse(value);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log('error', error);
        const errors = this.formatErrors(error, metadata.data);
        throw new BadRequestException({
          message: 'Validation failed',
          errors: errors,
        });
      }
      throw error;
    }
  }

  private formatErrors(
    error: ZodError,
    paramName: NullableField,
  ): ValidationError[] {
    return error.issues.map((issue) => ({
      field: issue.path.length > 0 ? `${issue.path}` : paramName,
      message: issue.message,
    }));
  }
}
