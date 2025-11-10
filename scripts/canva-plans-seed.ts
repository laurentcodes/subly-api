import { db } from '@/db';
import { sub_plan } from '@/db/schema';

// canva subscription plans seed data
const canvaPlans = [
  // united states plans
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'US',
    plan_name: 'Canva Free',
    plan_price: '0',
    currency: 'USD',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'US',
    plan_name: 'Canva Pro',
    plan_price: '15.00',
    currency: 'USD',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'US',
    plan_name: 'Canva Pro',
    plan_price: '120.00',
    currency: 'USD',
    billing_cycle: 'yearly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'US',
    plan_name: 'Canva Teams',
    plan_price: '10.00', // per person, min 3 people
    currency: 'USD',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'US',
    plan_name: 'Canva Teams',
    plan_price: '100.00', // per person, min 3 people
    currency: 'USD',
    billing_cycle: 'yearly' as const,
  },

  // united kingdom plans
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'GB',
    plan_name: 'Canva Free',
    plan_price: '0',
    currency: 'GBP',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'GB',
    plan_name: 'Canva Pro',
    plan_price: '10.99',
    currency: 'GBP',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'GB',
    plan_name: 'Canva Pro',
    plan_price: '99.99',
    currency: 'GBP',
    billing_cycle: 'yearly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'GB',
    plan_name: 'Canva Teams',
    plan_price: '8.00', // per person, min 3 people
    currency: 'GBP',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'GB',
    plan_name: 'Canva Teams',
    plan_price: '72.00', // per person, min 3 people
    currency: 'GBP',
    billing_cycle: 'yearly' as const,
  },

  // canada plans
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'CA',
    plan_name: 'Canva Free',
    plan_price: '0',
    currency: 'CAD',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'CA',
    plan_name: 'Canva Pro',
    plan_price: '16.99',
    currency: 'CAD',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'CA',
    plan_name: 'Canva Pro',
    plan_price: '149.99',
    currency: 'CAD',
    billing_cycle: 'yearly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'CA',
    plan_name: 'Canva Teams',
    plan_price: '12.50', // per person, min 3 people
    currency: 'CAD',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'CA',
    plan_name: 'Canva Teams',
    plan_price: '125.00', // per person, min 3 people
    currency: 'CAD',
    billing_cycle: 'yearly' as const,
  },

  // australia plans
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'AU',
    plan_name: 'Canva Free',
    plan_price: '0',
    currency: 'AUD',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'AU',
    plan_name: 'Canva Pro',
    plan_price: '19.99',
    currency: 'AUD',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'AU',
    plan_name: 'Canva Pro',
    plan_price: '159.99',
    currency: 'AUD',
    billing_cycle: 'yearly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'AU',
    plan_name: 'Canva Teams',
    plan_price: '13.50', // per person, min 3 people
    currency: 'AUD',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'AU',
    plan_name: 'Canva Teams',
    plan_price: '135.00', // per person, min 3 people
    currency: 'AUD',
    billing_cycle: 'yearly' as const,
  },

  // new zealand plans
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'NZ',
    plan_name: 'Canva Free',
    plan_price: '0',
    currency: 'NZD',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'NZ',
    plan_name: 'Canva Pro',
    plan_price: '21.99',
    currency: 'NZD',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'NZ',
    plan_name: 'Canva Pro',
    plan_price: '169.99',
    currency: 'NZD',
    billing_cycle: 'yearly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'NZ',
    plan_name: 'Canva Teams',
    plan_price: '14.50', // per person, min 3 people
    currency: 'NZD',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'NZ',
    plan_name: 'Canva Teams',
    plan_price: '145.00', // per person, min 3 people
    currency: 'NZD',
    billing_cycle: 'yearly' as const,
  },

  // european union (euro zone)
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'FR',
    plan_name: 'Canva Gratuit',
    plan_price: '0',
    currency: 'EUR',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'FR',
    plan_name: 'Canva Pro',
    plan_price: '11.99',
    currency: 'EUR',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'FR',
    plan_name: 'Canva Pro',
    plan_price: '109.99',
    currency: 'EUR',
    billing_cycle: 'yearly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'FR',
    plan_name: 'Canva Équipes',
    plan_price: '8.50', // per person, min 3 people
    currency: 'EUR',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'FR',
    plan_name: 'Canva Équipes',
    plan_price: '85.00', // per person, min 3 people
    currency: 'EUR',
    billing_cycle: 'yearly' as const,
  },

  // germany
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'DE',
    plan_name: 'Canva Kostenlos',
    plan_price: '0',
    currency: 'EUR',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'DE',
    plan_name: 'Canva Pro',
    plan_price: '11.99',
    currency: 'EUR',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'DE',
    plan_name: 'Canva Pro',
    plan_price: '109.99',
    currency: 'EUR',
    billing_cycle: 'yearly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'DE',
    plan_name: 'Canva Teams',
    plan_price: '8.50', // per person, min 3 people
    currency: 'EUR',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'DE',
    plan_name: 'Canva Teams',
    plan_price: '85.00', // per person, min 3 people
    currency: 'EUR',
    billing_cycle: 'yearly' as const,
  },

  // italy
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'IT',
    plan_name: 'Canva Gratuito',
    plan_price: '0',
    currency: 'EUR',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'IT',
    plan_name: 'Canva Pro',
    plan_price: '11.99',
    currency: 'EUR',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'IT',
    plan_name: 'Canva Pro',
    plan_price: '109.99',
    currency: 'EUR',
    billing_cycle: 'yearly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'IT',
    plan_name: 'Canva Teams',
    plan_price: '8.50', // per person, min 3 people
    currency: 'EUR',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'IT',
    plan_name: 'Canva Teams',
    plan_price: '85.00', // per person, min 3 people
    currency: 'EUR',
    billing_cycle: 'yearly' as const,
  },

  // spain
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'ES',
    plan_name: 'Canva Gratis',
    plan_price: '0',
    currency: 'EUR',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'ES',
    plan_name: 'Canva Pro',
    plan_price: '11.99',
    currency: 'EUR',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'ES',
    plan_name: 'Canva Pro',
    plan_price: '109.99',
    currency: 'EUR',
    billing_cycle: 'yearly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'ES',
    plan_name: 'Canva Equipos',
    plan_price: '8.50', // per person, min 3 people
    currency: 'EUR',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'ES',
    plan_name: 'Canva Equipos',
    plan_price: '85.00', // per person, min 3 people
    currency: 'EUR',
    billing_cycle: 'yearly' as const,
  },

  // japan
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'JP',
    plan_name: 'Canva無料',
    plan_price: '0',
    currency: 'JPY',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'JP',
    plan_name: 'Canva Pro',
    plan_price: '1500',
    currency: 'JPY',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'JP',
    plan_name: 'Canva Pro',
    plan_price: '12000',
    currency: 'JPY',
    billing_cycle: 'yearly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'JP',
    plan_name: 'Canva Teams',
    plan_price: '1000', // per person, min 3 people
    currency: 'JPY',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'JP',
    plan_name: 'Canva Teams',
    plan_price: '10000', // per person, min 3 people
    currency: 'JPY',
    billing_cycle: 'yearly' as const,
  },

  // india
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'IN',
    plan_name: 'Canva Free',
    plan_price: '0',
    currency: 'INR',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'IN',
    plan_name: 'Canva Pro',
    plan_price: '499',
    currency: 'INR',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'IN',
    plan_name: 'Canva Pro',
    plan_price: '3999',
    currency: 'INR',
    billing_cycle: 'yearly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'IN',
    plan_name: 'Canva Teams',
    plan_price: '333', // per person, min 3 people
    currency: 'INR',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'IN',
    plan_name: 'Canva Teams',
    plan_price: '3330', // per person, min 3 people
    currency: 'INR',
    billing_cycle: 'yearly' as const,
  },

  // brazil
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'BR',
    plan_name: 'Canva Grátis',
    plan_price: '0',
    currency: 'BRL',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'BR',
    plan_name: 'Canva Pro',
    plan_price: '34.90',
    currency: 'BRL',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'BR',
    plan_name: 'Canva Pro',
    plan_price: '289.90',
    currency: 'BRL',
    billing_cycle: 'yearly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'BR',
    plan_name: 'Canva Equipes',
    plan_price: '24.90', // per person, min 3 people
    currency: 'BRL',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'BR',
    plan_name: 'Canva Equipes',
    plan_price: '249.00', // per person, min 3 people
    currency: 'BRL',
    billing_cycle: 'yearly' as const,
  },

  // mexico
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'MX',
    plan_name: 'Canva Gratis',
    plan_price: '0',
    currency: 'MXN',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'MX',
    plan_name: 'Canva Pro',
    plan_price: '189',
    currency: 'MXN',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'MX',
    plan_name: 'Canva Pro',
    plan_price: '1899',
    currency: 'MXN',
    billing_cycle: 'yearly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'MX',
    plan_name: 'Canva Equipos',
    plan_price: '139', // per person, min 3 people
    currency: 'MXN',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'MX',
    plan_name: 'Canva Equipos',
    plan_price: '1390', // per person, min 3 people
    currency: 'MXN',
    billing_cycle: 'yearly' as const,
  },

  // turkey (one of the cheapest regions)
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'TR',
    plan_name: 'Canva Ücretsiz',
    plan_price: '0',
    currency: 'TRY',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'TR',
    plan_name: 'Canva Pro',
    plan_price: '99.99',
    currency: 'TRY',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'TR',
    plan_name: 'Canva Pro',
    plan_price: '999.99',
    currency: 'TRY',
    billing_cycle: 'yearly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'TR',
    plan_name: 'Canva Teams',
    plan_price: '69.99', // per person, min 3 people
    currency: 'TRY',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'TR',
    plan_name: 'Canva Teams',
    plan_price: '699.99', // per person, min 3 people
    currency: 'TRY',
    billing_cycle: 'yearly' as const,
  },

  // singapore
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'SG',
    plan_name: 'Canva Free',
    plan_price: '0',
    currency: 'SGD',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'SG',
    plan_name: 'Canva Pro',
    plan_price: '15.90',
    currency: 'SGD',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'SG',
    plan_name: 'Canva Pro',
    plan_price: '139.90',
    currency: 'SGD',
    billing_cycle: 'yearly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'SG',
    plan_name: 'Canva Teams',
    plan_price: '11.90', // per person, min 3 people
    currency: 'SGD',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'SG',
    plan_name: 'Canva Teams',
    plan_price: '119.00', // per person, min 3 people
    currency: 'SGD',
    billing_cycle: 'yearly' as const,
  },

  // nigeria
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'NG',
    plan_name: 'Canva Pro',
    plan_price: '2800',
    currency: 'NGN',
    billing_cycle: 'monthly',
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'NG',
    plan_name: 'Canva Pro',
    plan_price: '23900',
    currency: 'NGN',
    billing_cycle: 'yearly',
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'NG',
    plan_name: 'Canva Teams',
    plan_price: '17988',
    currency: 'NGN',
    billing_cycle: 'monthly',
  },
  {
    sub_service_id: '3eff8a17-ae11-4db2-af01-8ad70b0a6784',
    country: 'NG',
    plan_name: 'Canva Teams',
    plan_price: '17988',
    currency: 'NGN',
    billing_cycle: 'yearly',
  },
];

// seed function
export async function seedCanvaPlans() {
  try {
    console.log('🎨 starting canva plans seed...');

    // optional: clear existing canva plans for this service
    // await db.delete(subscription_plans)
    //   .where(eq(subscription_plans.sub_service_id, '3eff8a17-ae11-4db2-af01-8ad70b0a6784'));

    // insert all plans
    const insertedPlans = await db
      .insert(sub_plan)
      .values(canvaPlans)
      .returning();

    console.log(
      `✅ successfully seeded ${insertedPlans.length} canva subscription plans`,
    );
    return insertedPlans;
  } catch (error) {
    console.error('❌ error seeding canva plans:', error);
    throw error;
  }
}

// execute if running this file directly
seedCanvaPlans()
  .then(() => {
    console.log('🎉 seed completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 seed failed:', error);
    process.exit(1);
  });
