import { db } from '@/db';
import { sub_plan } from '@/db/schema';

// netflix subscription plans seed data
// prices reflect january 2025 increases and regional variations
const netflixPlans = [
  // united states plans (prices as of january 2025)
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'US',
    plan_name: 'Standard with Ads',
    plan_price: '7.99',
    currency: 'USD',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'US',
    plan_name: 'Standard',
    plan_price: '17.99',
    currency: 'USD',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'US',
    plan_name: 'Premium',
    plan_price: '24.99',
    currency: 'USD',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'US',
    plan_name: 'Extra Member',
    plan_price: '8.99',
    currency: 'USD',
    billing_cycle: 'monthly' as const,
  },

  // united kingdom plans
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'GB',
    plan_name: 'Standard with Ads',
    plan_price: '4.99',
    currency: 'GBP',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'GB',
    plan_name: 'Standard',
    plan_price: '10.99',
    currency: 'GBP',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'GB',
    plan_name: 'Premium',
    plan_price: '17.99',
    currency: 'GBP',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'GB',
    plan_name: 'Extra Member',
    plan_price: '4.99',
    currency: 'GBP',
    billing_cycle: 'monthly' as const,
  },

  // canada plans
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'CA',
    plan_name: 'Standard with Ads',
    plan_price: '7.99',
    currency: 'CAD',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'CA',
    plan_name: 'Standard',
    plan_price: '16.49',
    currency: 'CAD',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'CA',
    plan_name: 'Premium',
    plan_price: '22.99',
    currency: 'CAD',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'CA',
    plan_name: 'Extra Member',
    plan_price: '7.99',
    currency: 'CAD',
    billing_cycle: 'monthly' as const,
  },

  // australia plans
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'AU',
    plan_name: 'Standard with Ads',
    plan_price: '7.99',
    currency: 'AUD',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'AU',
    plan_name: 'Standard',
    plan_price: '18.99',
    currency: 'AUD',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'AU',
    plan_name: 'Premium',
    plan_price: '25.99',
    currency: 'AUD',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'AU',
    plan_name: 'Extra Member',
    plan_price: '7.99',
    currency: 'AUD',
    billing_cycle: 'monthly' as const,
  },

  // new zealand plans
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'NZ',
    plan_name: 'Standard with Ads',
    plan_price: '9.99',
    currency: 'NZD',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'NZ',
    plan_name: 'Standard',
    plan_price: '18.49',
    currency: 'NZD',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'NZ',
    plan_name: 'Premium',
    plan_price: '25.99',
    currency: 'NZD',
    billing_cycle: 'monthly' as const,
  },

  // germany plans
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'DE',
    plan_name: 'Standard mit Werbung',
    plan_price: '4.99',
    currency: 'EUR',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'DE',
    plan_name: 'Standard',
    plan_price: '12.99',
    currency: 'EUR',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'DE',
    plan_name: 'Premium',
    plan_price: '19.99',
    currency: 'EUR',
    billing_cycle: 'monthly' as const,
  },

  // france plans
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'FR',
    plan_name: 'Standard avec pub',
    plan_price: '5.99',
    currency: 'EUR',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'FR',
    plan_name: 'Standard',
    plan_price: '13.49',
    currency: 'EUR',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'FR',
    plan_name: 'Premium',
    plan_price: '19.99',
    currency: 'EUR',
    billing_cycle: 'monthly' as const,
  },

  // italy plans
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'IT',
    plan_name: 'Standard con pubblicità',
    plan_price: '5.49',
    currency: 'EUR',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'IT',
    plan_name: 'Standard',
    plan_price: '12.99',
    currency: 'EUR',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'IT',
    plan_name: 'Premium',
    plan_price: '19.99',
    currency: 'EUR',
    billing_cycle: 'monthly' as const,
  },

  // spain plans
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'ES',
    plan_name: 'Estándar con anuncios',
    plan_price: '5.49',
    currency: 'EUR',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'ES',
    plan_name: 'Estándar',
    plan_price: '12.99',
    currency: 'EUR',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'ES',
    plan_name: 'Premium',
    plan_price: '19.99',
    currency: 'EUR',
    billing_cycle: 'monthly' as const,
  },

  // japan plans
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'JP',
    plan_name: '広告つきスタンダード',
    plan_price: '790',
    currency: 'JPY',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'JP',
    plan_name: 'スタンダード',
    plan_price: '1490',
    currency: 'JPY',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'JP',
    plan_name: 'プレミアム',
    plan_price: '1980',
    currency: 'JPY',
    billing_cycle: 'monthly' as const,
  },

  // india plans
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'IN',
    plan_name: 'Mobile',
    plan_price: '149',
    currency: 'INR',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'IN',
    plan_name: 'Basic',
    plan_price: '199',
    currency: 'INR',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'IN',
    plan_name: 'Standard',
    plan_price: '499',
    currency: 'INR',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'IN',
    plan_name: 'Premium',
    plan_price: '649',
    currency: 'INR',
    billing_cycle: 'monthly' as const,
  },

  // brazil plans
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'BR',
    plan_name: 'Padrão com anúncios',
    plan_price: '20.90',
    currency: 'BRL',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'BR',
    plan_name: 'Padrão',
    plan_price: '44.90',
    currency: 'BRL',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'BR',
    plan_name: 'Premium',
    plan_price: '59.90',
    currency: 'BRL',
    billing_cycle: 'monthly' as const,
  },

  // mexico plans
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'MX',
    plan_name: 'Estándar con anuncios',
    plan_price: '99',
    currency: 'MXN',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'MX',
    plan_name: 'Estándar',
    plan_price: '219',
    currency: 'MXN',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'MX',
    plan_name: 'Premium',
    plan_price: '299',
    currency: 'MXN',
    billing_cycle: 'monthly' as const,
  },

  // argentina plans (recent price increases)
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'AR',
    plan_name: 'Estándar con anuncios',
    plan_price: '3199',
    currency: 'ARS',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'AR',
    plan_name: 'Estándar',
    plan_price: '5799',
    currency: 'ARS',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'AR',
    plan_name: 'Premium',
    plan_price: '8499',
    currency: 'ARS',
    billing_cycle: 'monthly' as const,
  },

  // turkey plans (one of the cheapest)
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'TR',
    plan_name: 'Temel',
    plan_price: '149.99',
    currency: 'TRY',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'TR',
    plan_name: 'Standart',
    plan_price: '229.99',
    currency: 'TRY',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'TR',
    plan_name: 'Özel',
    plan_price: '299.99',
    currency: 'TRY',
    billing_cycle: 'monthly' as const,
  },

  // south africa plans
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'ZA',
    plan_name: 'Standard with Ads',
    plan_price: '49',
    currency: 'ZAR',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'ZA',
    plan_name: 'Standard',
    plan_price: '159',
    currency: 'ZAR',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'ZA',
    plan_name: 'Premium',
    plan_price: '199',
    currency: 'ZAR',
    billing_cycle: 'monthly' as const,
  },

  // nigeria plans (prices as of june 2025)
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'NG',
    plan_name: 'Mobile',
    plan_price: '2500',
    currency: 'NGN',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'NG',
    plan_name: 'Basic',
    plan_price: '4000',
    currency: 'NGN',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'NG',
    plan_name: 'Standard',
    plan_price: '6500',
    currency: 'NGN',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'NG',
    plan_name: 'Premium',
    plan_price: '8500',
    currency: 'NGN',
    billing_cycle: 'monthly' as const,
  },

  // kenya plans
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'KE',
    plan_name: 'Mobile',
    plan_price: '200',
    currency: 'KES',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'KE',
    plan_name: 'Basic',
    plan_price: '300',
    currency: 'KES',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'KE',
    plan_name: 'Standard',
    plan_price: '700',
    currency: 'KES',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'KE',
    plan_name: 'Premium',
    plan_price: '1100',
    currency: 'KES',
    billing_cycle: 'monthly' as const,
  },

  // egypt plans (one of the cheapest)
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'EG',
    plan_name: 'Mobile',
    plan_price: '70',
    currency: 'EGP',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'EG',
    plan_name: 'Basic',
    plan_price: '120',
    currency: 'EGP',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'EG',
    plan_name: 'Standard',
    plan_price: '200',
    currency: 'EGP',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'EG',
    plan_name: 'Premium',
    plan_price: '280',
    currency: 'EGP',
    billing_cycle: 'monthly' as const,
  },

  // pakistan plans (cheapest in the world)
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'PK',
    plan_name: 'Mobile',
    plan_price: '250',
    currency: 'PKR',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'PK',
    plan_name: 'Basic',
    plan_price: '450',
    currency: 'PKR',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'PK',
    plan_name: 'Standard',
    plan_price: '800',
    currency: 'PKR',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'PK',
    plan_name: 'Premium',
    plan_price: '1100',
    currency: 'PKR',
    billing_cycle: 'monthly' as const,
  },

  // singapore plans
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'SG',
    plan_name: 'Standard with Ads',
    plan_price: '7.98',
    currency: 'SGD',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'SG',
    plan_name: 'Standard',
    plan_price: '15.98',
    currency: 'SGD',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'SG',
    plan_name: 'Premium',
    plan_price: '20.98',
    currency: 'SGD',
    billing_cycle: 'monthly' as const,
  },

  // south korea plans
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'KR',
    plan_name: '광고형 스탠다드',
    plan_price: '5500',
    currency: 'KRW',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'KR',
    plan_name: '스탠다드',
    plan_price: '13500',
    currency: 'KRW',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'KR',
    plan_name: '프리미엄',
    plan_price: '17000',
    currency: 'KRW',
    billing_cycle: 'monthly' as const,
  },

  // poland plans
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'PL',
    plan_name: 'Standard z reklamami',
    plan_price: '23',
    currency: 'PLN',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'PL',
    plan_name: 'Standard',
    plan_price: '43',
    currency: 'PLN',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'PL',
    plan_name: 'Premium',
    plan_price: '60',
    currency: 'PLN',
    billing_cycle: 'monthly' as const,
  },

  // uae plans
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'AE',
    plan_name: 'Mobile',
    plan_price: '19.99',
    currency: 'AED',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'AE',
    plan_name: 'Basic',
    plan_price: '29.99',
    currency: 'AED',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'AE',
    plan_name: 'Standard',
    plan_price: '44.99',
    currency: 'AED',
    billing_cycle: 'monthly' as const,
  },
  {
    sub_service_id: '4f8a7429-2664-4145-abd4-18b9f385a512',
    country: 'AE',
    plan_name: 'Premium',
    plan_price: '59.99',
    currency: 'AED',
    billing_cycle: 'monthly' as const,
  },
];

// seed function
export async function seedNetflixPlans() {
  try {
    console.log('🎬 starting netflix plans seed...');
    
    // optional: clear existing netflix plans for this service
    // await db.delete(sub_plan)
    //   .where(eq(sub_plan.sub_service_id, '4f8a7429-2664-4145-abd4-18b9f385a512'));
    
    // insert all plans
    const insertedPlans = await db.insert(sub_plan).values(netflixPlans).returning();
    
    console.log(`✅ successfully seeded ${insertedPlans.length} netflix subscription plans`);
    return insertedPlans;
  } catch (error) {
    console.error('❌ error seeding netflix plans:', error);
    throw error;
  }
}

// execute if running this file directly
seedNetflixPlans()
  .then(() => {
    console.log('🎉 seed completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 seed failed:', error);
    process.exit(1);
  });
