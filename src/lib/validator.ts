import type { MiddlewareHandler } from 'hono';
import type { ZodSchema } from 'zod';

export const validator = (
  target: 'json' | 'query' | 'param',
  schema: ZodSchema,
): MiddlewareHandler => {
  return async (c, next) => {
    let data;

    try {
      if (target === 'json') {
        data = await c.req.json();
      } else if (target === 'query') {
        data = c.req.query();
      } else if (target === 'param') {
        data = c.req.param();
      }

      const result = schema.safeParse(data);

      if (!result.success) {
        // throw error to be caught by global error handler
        throw result.error;
      }

      c.set('validatedData', result.data);

      await next();
    } catch (error) {
      // re-throw all errors to be handled by global error handler
      throw error;
    }
  };
};
