// db
import { db } from '@/db';

// get user by id
const getUserById = async (id: string) => {
  const user = await db.query.user.findFirst({
    where: (user, { eq }) => eq(user.id, id),
  });

  return user;
};

// get user currency
const getUserCurrency = async (userId: string) => {
  const user = await getUserById(userId);

  return user?.baseCurrency || 'NGN';
};

export { getUserById, getUserCurrency };
