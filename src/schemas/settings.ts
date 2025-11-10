import { z } from 'zod';

export const updateSettingsSchema = z.object({
  show_only_base_currency: z.boolean().optional(),
  baseCurrency: z
    .string()
    .length(3, 'currency must be a 3-letter code')
    .toUpperCase()
    .optional()
    .nullable(),
});
