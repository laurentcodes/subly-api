import { Hono } from 'hono';

// middleware
import { requireVerifiedEmail } from '@/middleware/protected';

// services
import { getUserSubscriptionOverview } from '@/services/statistics/user-overview';
import { getUpcomingPayments } from '@/services/statistics/upcoming-payments';
import { getSpendingByService } from '@/services/statistics/spending-by-service';
import { getBillingCycleDistribution } from '@/services/statistics/billing-cycles';
import { getAutoRenewStatus } from '@/services/statistics/auto-renew-status';
import { getSavingsOpportunities } from '@/services/statistics/savings-opportunities';

const statistics = new Hono();

statistics.get('/overview', requireVerifiedEmail, getUserSubscriptionOverview);
statistics.get('/upcoming-payments', requireVerifiedEmail, getUpcomingPayments);
statistics.get('/spending-by-service', requireVerifiedEmail, getSpendingByService);
statistics.get('/billing-cycles', requireVerifiedEmail, getBillingCycleDistribution);
statistics.get('/auto-renew-status', requireVerifiedEmail, getAutoRenewStatus);
statistics.get(
  '/savings-opportunities',
  requireVerifiedEmail,
  getSavingsOpportunities
);

export { statistics };
