import type { Context } from 'hono';
import { ZodError } from 'zod';

export const errorHandler = (err: Error, c: Context) => {
  // Handle Zod validation errors
  if (err instanceof ZodError) {
    const errors = err.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));

    return c.json(
      {
        success: false,
        error: 'Validation failed',
        details: errors,
      },
      400,
    );
  }

  // Handle other errors
  console.error('Unhandled error:', err);

  return c.json(
    {
      success: false,
      error: err.message || 'Internal server error',
    },
    500,
  );
};
