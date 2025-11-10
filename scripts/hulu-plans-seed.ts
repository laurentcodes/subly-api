import { db } from '@/db';
import { sub_plan } from '@/db/schema';

// hulu subscription plans seed data
// note: hulu is primarily available in the us only
// prices effective october 21, 2025
const huluPlans = [
  // united states - standalone hulu plans
  {
    sub_service_id: 'a771bae9-7aae-4efe-9dca-19c1eb602af0',
    country: 'US',
    plan_name: 'Hulu (With Ads)',
    plan_price: '11.99',
    currency: 'USD',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: 'a771bae9-7aae-4efe-9dca-19c1eb602af0',
    country: 'US',
    plan_name: 'Hulu (With Ads)',
    plan_price: '99.99',
    currency: 'USD',
    billing_cycle: 'yearly' as const,
  },
  {
    sub_service_id: 'a771bae9-7aae-4efe-9dca-19c1eb602af0',
    country: 'US',
    plan_name: 'Hulu (No Ads)',
    plan_price: '18.99',
    currency: 'USD',
    billing_cycle: 'monthly' as const,
  },
  
  // hulu + live tv plans
  {
    sub_service_id: 'a771bae9-7aae-4efe-9dca-19c1eb602af0',
    country: 'US',
    plan_name: 'Hulu + Live TV (With Ads)',
    plan_price: '89.99',
    currency: 'USD',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: 'a771bae9-7aae-4efe-9dca-19c1eb602af0',
    country: 'US',
    plan_name: 'Hulu + Live TV (No Ads)',
    plan_price: '99.99',
    currency: 'USD',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: 'a771bae9-7aae-4efe-9dca-19c1eb602af0',
    country: 'US',
    plan_name: 'Live TV Only',
    plan_price: '81.99',
    currency: 'USD',
    billing_cycle: 'monthly' as const,
  },

  // disney bundle plans (duo)
  {
    sub_service_id: 'a771bae9-7aae-4efe-9dca-19c1eb602af0',
    country: 'US',
    plan_name: 'Disney Bundle Duo Basic (Hulu + Disney+)',
    plan_price: '12.99',
    currency: 'USD',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: 'a771bae9-7aae-4efe-9dca-19c1eb602af0',
    country: 'US',
    plan_name: 'Disney Bundle Duo Premium (Hulu + Disney+ No Ads)',
    plan_price: '19.99',
    currency: 'USD',
    billing_cycle: 'monthly' as const,
  },

  // disney bundle plans (trio)
  {
    sub_service_id: 'a771bae9-7aae-4efe-9dca-19c1eb602af0',
    country: 'US',
    plan_name: 'Disney Bundle Trio Basic (Hulu + Disney+ + ESPN+)',
    plan_price: '19.99',
    currency: 'USD',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: 'a771bae9-7aae-4efe-9dca-19c1eb602af0',
    country: 'US',
    plan_name: 'Disney Bundle Trio Premium (No Ads)',
    plan_price: '29.99',
    currency: 'USD',
    billing_cycle: 'monthly' as const,
  },

  // hulu + max bundles
  {
    sub_service_id: 'a771bae9-7aae-4efe-9dca-19c1eb602af0',
    country: 'US',
    plan_name: 'Hulu + Disney+ + Max Bundle (With Ads)',
    plan_price: '16.99',
    currency: 'USD',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: 'a771bae9-7aae-4efe-9dca-19c1eb602af0',
    country: 'US',
    plan_name: 'Hulu + Disney+ + Max Bundle (No Ads)',
    plan_price: '29.99',
    currency: 'USD',
    billing_cycle: 'monthly' as const,
  },

  // student plan
  {
    sub_service_id: 'a771bae9-7aae-4efe-9dca-19c1eb602af0',
    country: 'US',
    plan_name: 'Hulu Student (With Ads)',
    plan_price: '1.99',
    currency: 'USD',
    billing_cycle: 'monthly' as const,
  },

  // premium add-ons (these are additions to base plans)
  {
    sub_service_id: 'a771bae9-7aae-4efe-9dca-19c1eb602af0',
    country: 'US',
    plan_name: 'Max Add-on (With Ads)',
    plan_price: '9.99',
    currency: 'USD',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: 'a771bae9-7aae-4efe-9dca-19c1eb602af0',
    country: 'US',
    plan_name: 'Max Add-on (No Ads)',
    plan_price: '16.99',
    currency: 'USD',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: 'a771bae9-7aae-4efe-9dca-19c1eb602af0',
    country: 'US',
    plan_name: 'Cinemax Add-on',
    plan_price: '9.99',
    currency: 'USD',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: 'a771bae9-7aae-4efe-9dca-19c1eb602af0',
    country: 'US',
    plan_name: 'Paramount+ with SHOWTIME Add-on',
    plan_price: '12.99',
    currency: 'USD',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: 'a771bae9-7aae-4efe-9dca-19c1eb602af0',
    country: 'US',
    plan_name: 'STARZ Add-on',
    plan_price: '10.99',
    currency: 'USD',
    billing_cycle: 'monthly' as const,
  },

  // live tv add-ons
  {
    sub_service_id: 'a771bae9-7aae-4efe-9dca-19c1eb602af0',
    country: 'US',
    plan_name: 'Unlimited Screens Add-on',
    plan_price: '9.99',
    currency: 'USD',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: 'a771bae9-7aae-4efe-9dca-19c1eb602af0',
    country: 'US',
    plan_name: 'Entertainment Add-on',
    plan_price: '7.99',
    currency: 'USD',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: 'a771bae9-7aae-4efe-9dca-19c1eb602af0',
    country: 'US',
    plan_name: 'Sports Add-on',
    plan_price: '9.99',
    currency: 'USD',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: 'a771bae9-7aae-4efe-9dca-19c1eb602af0',
    country: 'US',
    plan_name: 'Español Add-on',
    plan_price: '4.99',
    currency: 'USD',
    billing_cycle: 'monthly' as const,
  },

  // japan (hulu japan operates independently)
  {
    sub_service_id: 'a771bae9-7aae-4efe-9dca-19c1eb602af0',
    country: 'JP',
    plan_name: 'Hulu',
    plan_price: '1026',
    currency: 'JPY',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: 'a771bae9-7aae-4efe-9dca-19c1eb602af0',
    country: 'JP',
    plan_name: 'Hulu | Disney+ Bundle',
    plan_price: '1490',
    currency: 'JPY',
    billing_cycle: 'monthly' as const,
  },

  // puerto rico (us territory - same as us pricing)
  {
    sub_service_id: 'a771bae9-7aae-4efe-9dca-19c1eb602af0',
    country: 'PR',
    plan_name: 'Hulu (With Ads)',
    plan_price: '11.99',
    currency: 'USD',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: 'a771bae9-7aae-4efe-9dca-19c1eb602af0',
    country: 'PR',
    plan_name: 'Hulu (With Ads)',
    plan_price: '99.99',
    currency: 'USD',
    billing_cycle: 'yearly' as const,
  },
  {
    sub_service_id: 'a771bae9-7aae-4efe-9dca-19c1eb602af0',
    country: 'PR',
    plan_name: 'Hulu (No Ads)',
    plan_price: '18.99',
    currency: 'USD',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: 'a771bae9-7aae-4efe-9dca-19c1eb602af0',
    country: 'PR',
    plan_name: 'Hulu + Live TV (With Ads)',
    plan_price: '89.99',
    currency: 'USD',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: 'a771bae9-7aae-4efe-9dca-19c1eb602af0',
    country: 'PR',
    plan_name: 'Hulu + Live TV (No Ads)',
    plan_price: '99.99',
    currency: 'USD',
    billing_cycle: 'monthly' as const,
  },

  // us military bases overseas (same as us pricing)
  {
    sub_service_id: 'a771bae9-7aae-4efe-9dca-19c1eb602af0',
    country: 'US-MIL',
    plan_name: 'Hulu (With Ads)',
    plan_price: '11.99',
    currency: 'USD',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: 'a771bae9-7aae-4efe-9dca-19c1eb602af0',
    country: 'US-MIL',
    plan_name: 'Hulu (No Ads)',
    plan_price: '18.99',
    currency: 'USD',
    billing_cycle: 'monthly' as const,
  },
];

// seed function
export async function seedHuluPlans() {
  try {
    console.log('📺 starting hulu plans seed...');
    
    // optional: clear existing hulu plans for this service
    // await db.delete(sub_plan)
    //   .where(eq(sub_plan.sub_service_id, 'a771bae9-7aae-4efe-9dca-19c1eb602af0'));
    
    // insert all plans
    const insertedPlans = await db.insert(sub_plan).values(huluPlans).returning();
    
    console.log(`✅ successfully seeded ${insertedPlans.length} hulu subscription plans`);
    return insertedPlans;
  } catch (error) {
    console.error('❌ error seeding hulu plans:', error);
    throw error;
  }
}

// execute if running this file directly
seedHuluPlans()
  .then(() => {
    console.log('🎉 seed completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 seed failed:', error);
    process.exit(1);
  });
