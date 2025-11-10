import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';

// middleware
import { authMiddleware } from '@/middleware/auth';
import { errorHandler } from '@/middleware/error-handler';

// routes
import { authentication } from '@/routes/auth.route';
import { session } from '@/routes/session.route';
import { subscriptions } from '@/routes/subscriptions.route';
import { statistics } from './routes/statistics.route';
import { settings } from './routes/settings.route';

const app = new Hono().basePath('/api');

// cors
app.use('/api/*', cors());

// global error handler
app.onError(errorHandler);

// logger
app.use(logger());

// auth middleware
app.use('*', authMiddleware);

// health check route
app.get('/health-check', (c) => {
  return c.json({
    success: true,
    message: 'Subly API',
  });
});

// route handlers
app.route('/auth', authentication);
app.route('/session', session);
app.route('/subscriptions', subscriptions);
app.route('/statistics', statistics);
app.route('/settings', settings);

export default app;
