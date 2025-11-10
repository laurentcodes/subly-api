import type { Context } from 'hono';

// db
import { db } from '@/db';
import { sub_service } from '@/db/schema';

// lib
import { getServiceByName } from '@/lib/services';

const getAllSubscriptionServices = async (c: Context) => {
  const services = await db.query.sub_service.findMany({
    orderBy: (sub_service, { asc }) => [asc(sub_service.name)],
  });

  return c.json({
    success: true,
    data: services,
    total: services.length,
  });
};

const createSubscriptionService = async (c: Context) => {
  const body = c.get('validatedData');

  const serviceExists = await getServiceByName(body.name);

  if (serviceExists) {
    return c.json(
      { success: false, error: 'A service with this name already exists' },
      400,
    );
  }

  const [service] = await db.insert(sub_service).values(body).returning();

  return c.json({ success: true, service }, 201);
};

export { getAllSubscriptionServices, createSubscriptionService };
