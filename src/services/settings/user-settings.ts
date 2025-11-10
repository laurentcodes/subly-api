import type { Context } from 'hono';
import { eq } from 'drizzle-orm';

// db
import { db } from '@/db';
import { user_settings } from '@/db/schema';

const getSettings = async (c: Context) => {
  const user = c.get('user');

  // check if settings already exist for this user
  let settings = await db.query.user_settings.findFirst({
    where: (user_settings, { eq }) => eq(user_settings.user_id, user.id),
  });

  // if settings don't exist, create default settings
  if (!settings) {
    const [newSettings] = await db
      .insert(user_settings)
      .values({
        user_id: user.id,
        show_only_base_currency: false,
        baseCurrency: user.baseCurrency || null,
      })
      .returning();

    settings = newSettings;
  }

  return c.json({ success: true, data: settings });
};

const updateSettings = async (c: Context) => {
  const user = c.get('user');
  const body = c.get('validatedData');

  // check if settings exist
  const existingSettings = await db.query.user_settings.findFirst({
    where: (user_settings, { eq }) => eq(user_settings.user_id, user.id),
  });

  if (!existingSettings) {
    return c.json(
      {
        success: false,
        message: 'settings not found. please initiate settings first',
      },
      404,
    );
  }

  // update settings
  const [updatedSettings] = await db
    .update(user_settings)
    .set({
      show_only_base_currency:
        body.show_only_base_currency ??
        existingSettings.show_only_base_currency,
      baseCurrency: body.baseCurrency ?? existingSettings.baseCurrency,
    })
    .where(eq(user_settings.user_id, user.id))
    .returning();

  return c.json({ success: true, data: updatedSettings });
};

export { getSettings, updateSettings };
