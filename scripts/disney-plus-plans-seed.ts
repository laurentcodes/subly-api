import { db } from '@/db';
import { sub_plan } from '@/db/schema';

// disney+ subscription plans seed data
const disneyPlusPlans = [
  // united states plans (prices effective october 21, 2025)
  {
    sub_service_id: 'f2d47c28-a261-46f8-8f27-e4faa1f8cf1b',
    country: 'US',
    plan_name: 'Disney+ Basic (With Ads)',
    plan_price: '11.99',
    currency: 'USD',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: 'f2d47c28-a261-46f8-8f27-e4faa1f8cf1b',
    country: 'US',
    plan_name: 'Disney+ Premium (No Ads)',
    plan_price: '18.99',
    currency: 'USD',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: 'f2d47c28-a261-46f8-8f27-e4faa1f8cf1b',
    country: 'US',
    plan_name: 'Disney+ Premium (No Ads)',
    plan_price: '189.99',
    currency: 'USD',
    billing_cycle: 'yearly' as const,
  },

  // united kingdom plans
  {
    sub_service_id: 'f2d47c28-a261-46f8-8f27-e4faa1f8cf1b',
    country: 'GB',
    plan_name: 'Standard with Ads',
    plan_price: '4.99',
    currency: 'GBP',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: 'f2d47c28-a261-46f8-8f27-e4faa1f8cf1b',
    country: 'GB',
    plan_name: 'Standard',
    plan_price: '7.99',
    currency: 'GBP',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: 'f2d47c28-a261-46f8-8f27-e4faa1f8cf1b',
    country: 'GB',
    plan_name: 'Premium',
    plan_price: '10.99',
    currency: 'GBP',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: 'f2d47c28-a261-46f8-8f27-e4faa1f8cf1b',
    country: 'GB',
    plan_name: 'Standard',
    plan_price: '79.90',
    currency: 'GBP',
    billing_cycle: 'yearly' as const,
  },
  {
    sub_service_id: 'f2d47c28-a261-46f8-8f27-e4faa1f8cf1b',
    country: 'GB',
    plan_name: 'Premium',
    plan_price: '109.90',
    currency: 'GBP',
    billing_cycle: 'yearly' as const,
  },

  // canada plans
  {
    sub_service_id: 'f2d47c28-a261-46f8-8f27-e4faa1f8cf1b',
    country: 'CA',
    plan_name: 'Standard with Ads',
    plan_price: '7.99',
    currency: 'CAD',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: 'f2d47c28-a261-46f8-8f27-e4faa1f8cf1b',
    country: 'CA',
    plan_name: 'Standard',
    plan_price: '11.99',
    currency: 'CAD',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: 'f2d47c28-a261-46f8-8f27-e4faa1f8cf1b',
    country: 'CA',
    plan_name: 'Premium',
    plan_price: '15.99',
    currency: 'CAD',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: 'f2d47c28-a261-46f8-8f27-e4faa1f8cf1b',
    country: 'CA',
    plan_name: 'Premium',
    plan_price: '159.99',
    currency: 'CAD',
    billing_cycle: 'yearly' as const,
  },

  // australia plans
  {
    sub_service_id: 'f2d47c28-a261-46f8-8f27-e4faa1f8cf1b',
    country: 'AU',
    plan_name: 'Standard',
    plan_price: '13.99',
    currency: 'AUD',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: 'f2d47c28-a261-46f8-8f27-e4faa1f8cf1b',
    country: 'AU',
    plan_name: 'Premium',
    plan_price: '17.99',
    currency: 'AUD',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: 'f2d47c28-a261-46f8-8f27-e4faa1f8cf1b',
    country: 'AU',
    plan_name: 'Standard',
    plan_price: '139.99',
    currency: 'AUD',
    billing_cycle: 'yearly' as const,
  },
  {
    sub_service_id: 'f2d47c28-a261-46f8-8f27-e4faa1f8cf1b',
    country: 'AU',
    plan_name: 'Premium',
    plan_price: '179.99',
    currency: 'AUD',
    billing_cycle: 'yearly' as const,
  },

  // new zealand plans
  {
    sub_service_id: 'f2d47c28-a261-46f8-8f27-e4faa1f8cf1b',
    country: 'NZ',
    plan_name: 'Standard',
    plan_price: '14.99',
    currency: 'NZD',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: 'f2d47c28-a261-46f8-8f27-e4faa1f8cf1b',
    country: 'NZ',
    plan_name: 'Premium',
    plan_price: '18.99',
    currency: 'NZD',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: 'f2d47c28-a261-46f8-8f27-e4faa1f8cf1b',
    country: 'NZ',
    plan_name: 'Standard',
    plan_price: '149.99',
    currency: 'NZD',
    billing_cycle: 'yearly' as const,
  },
  {
    sub_service_id: 'f2d47c28-a261-46f8-8f27-e4faa1f8cf1b',
    country: 'NZ',
    plan_name: 'Premium',
    plan_price: '189.99',
    currency: 'NZD',
    billing_cycle: 'yearly' as const,
  },

  // european union (france, germany, italy, spain - same pricing)
  {
    sub_service_id: 'f2d47c28-a261-46f8-8f27-e4faa1f8cf1b',
    country: 'FR',
    plan_name: 'Standard avec publicités',
    plan_price: '5.99',
    currency: 'EUR',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: 'f2d47c28-a261-46f8-8f27-e4faa1f8cf1b',
    country: 'FR',
    plan_name: 'Standard',
    plan_price: '8.99',
    currency: 'EUR',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: 'f2d47c28-a261-46f8-8f27-e4faa1f8cf1b',
    country: 'FR',
    plan_name: 'Premium',
    plan_price: '11.99',
    currency: 'EUR',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: 'f2d47c28-a261-46f8-8f27-e4faa1f8cf1b',
    country: 'FR',
    plan_name: 'Standard',
    plan_price: '89.90',
    currency: 'EUR',
    billing_cycle: 'yearly' as const,
  },
  {
    sub_service_id: 'f2d47c28-a261-46f8-8f27-e4faa1f8cf1b',
    country: 'FR',
    plan_name: 'Premium',
    plan_price: '119.90',
    currency: 'EUR',
    billing_cycle: 'yearly' as const,
  },

  // germany
  {
    sub_service_id: 'f2d47c28-a261-46f8-8f27-e4faa1f8cf1b',
    country: 'DE',
    plan_name: 'Standard mit Werbung',
    plan_price: '5.99',
    currency: 'EUR',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: 'f2d47c28-a261-46f8-8f27-e4faa1f8cf1b',
    country: 'DE',
    plan_name: 'Standard',
    plan_price: '8.99',
    currency: 'EUR',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: 'f2d47c28-a261-46f8-8f27-e4faa1f8cf1b',
    country: 'DE',
    plan_name: 'Premium',
    plan_price: '11.99',
    currency: 'EUR',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: 'f2d47c28-a261-46f8-8f27-e4faa1f8cf1b',
    country: 'DE',
    plan_name: 'Standard',
    plan_price: '89.90',
    currency: 'EUR',
    billing_cycle: 'yearly' as const,
  },
  {
    sub_service_id: 'f2d47c28-a261-46f8-8f27-e4faa1f8cf1b',
    country: 'DE',
    plan_name: 'Premium',
    plan_price: '119.90',
    currency: 'EUR',
    billing_cycle: 'yearly' as const,
  },

  // italy
  {
    sub_service_id: 'f2d47c28-a261-46f8-8f27-e4faa1f8cf1b',
    country: 'IT',
    plan_name: 'Standard con pubblicità',
    plan_price: '5.99',
    currency: 'EUR',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: 'f2d47c28-a261-46f8-8f27-e4faa1f8cf1b',
    country: 'IT',
    plan_name: 'Standard',
    plan_price: '8.99',
    currency: 'EUR',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: 'f2d47c28-a261-46f8-8f27-e4faa1f8cf1b',
    country: 'IT',
    plan_name: 'Premium',
    plan_price: '11.99',
    currency: 'EUR',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: 'f2d47c28-a261-46f8-8f27-e4faa1f8cf1b',
    country: 'IT',
    plan_name: 'Standard',
    plan_price: '89.90',
    currency: 'EUR',
    billing_cycle: 'yearly' as const,
  },
  {
    sub_service_id: 'f2d47c28-a261-46f8-8f27-e4faa1f8cf1b',
    country: 'IT',
    plan_name: 'Premium',
    plan_price: '119.90',
    currency: 'EUR',
    billing_cycle: 'yearly' as const,
  },

  // spain
  {
    sub_service_id: 'f2d47c28-a261-46f8-8f27-e4faa1f8cf1b',
    country: 'ES',
    plan_name: 'Estándar con anuncios',
    plan_price: '5.99',
    currency: 'EUR',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: 'f2d47c28-a261-46f8-8f27-e4faa1f8cf1b',
    country: 'ES',
    plan_name: 'Estándar',
    plan_price: '8.99',
    currency: 'EUR',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: 'f2d47c28-a261-46f8-8f27-e4faa1f8cf1b',
    country: 'ES',
    plan_name: 'Premium',
    plan_price: '11.99',
    currency: 'EUR',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: 'f2d47c28-a261-46f8-8f27-e4faa1f8cf1b',
    country: 'ES',
    plan_name: 'Estándar',
    plan_price: '89.90',
    currency: 'EUR',
    billing_cycle: 'yearly' as const,
  },
  {
    sub_service_id: 'f2d47c28-a261-46f8-8f27-e4faa1f8cf1b',
    country: 'ES',
    plan_name: 'Premium',
    plan_price: '119.90',
    currency: 'EUR',
    billing_cycle: 'yearly' as const,
  },

  // japan
  {
    sub_service_id: 'f2d47c28-a261-46f8-8f27-e4faa1f8cf1b',
    country: 'JP',
    plan_name: 'スタンダード',
    plan_price: '990',
    currency: 'JPY',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: 'f2d47c28-a261-46f8-8f27-e4faa1f8cf1b',
    country: 'JP',
    plan_name: 'プレミアム',
    plan_price: '1320',
    currency: 'JPY',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: 'f2d47c28-a261-46f8-8f27-e4faa1f8cf1b',
    country: 'JP',
    plan_name: 'スタンダード',
    plan_price: '9900',
    currency: 'JPY',
    billing_cycle: 'yearly' as const,
  },
  {
    sub_service_id: 'f2d47c28-a261-46f8-8f27-e4faa1f8cf1b',
    country: 'JP',
    plan_name: 'プレミアム',
    plan_price: '13200',
    currency: 'JPY',
    billing_cycle: 'yearly' as const,
  },

  // india (disney+ hotstar)
  {
    sub_service_id: 'f2d47c28-a261-46f8-8f27-e4faa1f8cf1b',
    country: 'IN',
    plan_name: 'Mobile',
    plan_price: '149',
    currency: 'INR',
    billing_cycle: 'yearly' as const,
  },
  {
    sub_service_id: 'f2d47c28-a261-46f8-8f27-e4faa1f8cf1b',
    country: 'IN',
    plan_name: 'Super',
    plan_price: '299',
    currency: 'INR',
    billing_cycle: 'yearly' as const,
  },
  {
    sub_service_id: 'f2d47c28-a261-46f8-8f27-e4faa1f8cf1b',
    country: 'IN',
    plan_name: 'Premium',
    plan_price: '499',
    currency: 'INR',
    billing_cycle: 'yearly' as const,
  },

  // brazil
  {
    sub_service_id: 'f2d47c28-a261-46f8-8f27-e4faa1f8cf1b',
    country: 'BR',
    plan_name: 'Padrão com anúncios',
    plan_price: '17.90',
    currency: 'BRL',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: 'f2d47c28-a261-46f8-8f27-e4faa1f8cf1b',
    country: 'BR',
    plan_name: 'Padrão',
    plan_price: '27.90',
    currency: 'BRL',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: 'f2d47c28-a261-46f8-8f27-e4faa1f8cf1b',
    country: 'BR',
    plan_name: 'Premium',
    plan_price: '37.90',
    currency: 'BRL',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: 'f2d47c28-a261-46f8-8f27-e4faa1f8cf1b',
    country: 'BR',
    plan_name: 'Premium',
    plan_price: '379.90',
    currency: 'BRL',
    billing_cycle: 'yearly' as const,
  },

  // mexico
  {
    sub_service_id: 'f2d47c28-a261-46f8-8f27-e4faa1f8cf1b',
    country: 'MX',
    plan_name: 'Estándar con anuncios',
    plan_price: '119',
    currency: 'MXN',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: 'f2d47c28-a261-46f8-8f27-e4faa1f8cf1b',
    country: 'MX',
    plan_name: 'Estándar',
    plan_price: '159',
    currency: 'MXN',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: 'f2d47c28-a261-46f8-8f27-e4faa1f8cf1b',
    country: 'MX',
    plan_name: 'Premium',
    plan_price: '195',
    currency: 'MXN',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: 'f2d47c28-a261-46f8-8f27-e4faa1f8cf1b',
    country: 'MX',
    plan_name: 'Estándar',
    plan_price: '1590',
    currency: 'MXN',
    billing_cycle: 'yearly' as const,
  },
  {
    sub_service_id: 'f2d47c28-a261-46f8-8f27-e4faa1f8cf1b',
    country: 'MX',
    plan_name: 'Premium',
    plan_price: '1950',
    currency: 'MXN',
    billing_cycle: 'yearly' as const,
  },
];

// seed function
export async function seedDisneyPlusPlans() {
  try {
    console.log('🎬 starting disney+ plans seed...');

    // optional: clear existing disney+ plans for this service
    // await db.delete(subscription_plans)
    //   .where(eq(subscription_plans.sub_service_id, 'f2d47c28-a261-46f8-8f27-e4faa1f8cf1b'));

    // insert all plans
    const insertedPlans = await db
      .insert(sub_plan)
      .values(disneyPlusPlans)
      .returning();

    console.log(
      `✅ successfully seeded ${insertedPlans.length} disney+ subscription plans`,
    );
    return insertedPlans;
  } catch (error) {
    console.error('❌ error seeding disney+ plans:', error);
    throw error;
  }
}

// execute if running this file directly
seedDisneyPlusPlans()
  .then(() => {
    console.log('🎉 seed completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 seed failed:', error);
    process.exit(1);
  });
