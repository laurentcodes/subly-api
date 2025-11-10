import { Hono } from 'hono';

// lib
import { validator } from '@/lib/validator';

// middleware
import { requireAuth } from '@/middleware/protected';

// schemas
import { updateSettingsSchema } from '@/schemas/settings';

// services
import {
  getSettings,
  updateSettings,
} from '@/services/settings/user-settings';

const settings = new Hono();

// get user settings (auto-initializes if not found)
settings.get('/', requireAuth, getSettings);

// update user settings
settings.patch(
  '/',
  requireAuth,
  validator('json', updateSettingsSchema),
  updateSettings,
);

export { settings };
