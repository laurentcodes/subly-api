import { Hono } from 'hono';
import { auth } from '@/lib/auth';

const authentication = new Hono();

authentication.on(['POST', 'GET'], '/*', (c) => auth.handler(c.req.raw));

export { authentication };
