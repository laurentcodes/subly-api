import { db } from '@/db';

const getServiceByName = async (name: string) => {
  const service = await db.query.sub_service.findFirst({
    where: (sub_service, { eq }) => eq(sub_service.name, name),
  });

  return service;
};

export { getServiceByName };
