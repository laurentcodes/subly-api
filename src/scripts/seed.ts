import { db } from '@/db';
import { sub_service } from '@/db/schemas/sub-services';
import { sub_plan } from '@/db/schemas/sub-plans';

const servicesData = [
  // streaming services
  {
    name: 'Disney+',
    image_url:
      'https://cdn.brandfetch.io/idAnvV1bvf/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX',
  },
  {
    name: 'HBO Max',
    image_url:
      'https://cdn.brandfetch.io/idxljrfCq4/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX',
  },
  {
    name: 'Hulu',
    image_url:
      'https://cdn.brandfetch.io/idGLjXH76P/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX',
  },
  {
    name: 'Apple TV+',
    image_url:
      'https://cdn.brandfetch.io/idGv0X39sM/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX',
  },
  {
    name: 'YouTube Premium',
    image_url:
      'https://cdn.brandfetch.io/idAnYAWEnz/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX',
  },
  {
    name: 'Prime Video',
    image_url:
      'https://cdn.brandfetch.io/idSUrLOePH/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX',
  },

  // productivity & software
  {
    name: 'Microsoft 365',
    image_url:
      'https://cdn.brandfetch.io/idIq_kF0rb/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX',
  },
  {
    name: 'Adobe Creative Cloud',
    image_url:
      'https://cdn.brandfetch.io/idZqFKbjdr/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX',
  },
  {
    name: 'Notion',
    image_url:
      'https://cdn.brandfetch.io/id3X5rYPT8/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX',
  },
  {
    name: 'Dropbox',
    image_url:
      'https://cdn.brandfetch.io/idGbWy4L1B/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX',
  },
  {
    name: 'Google One',
    image_url:
      'https://cdn.brandfetch.io/idocfCU_9A/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX',
  },
  {
    name: 'Canva',
    image_url:
      'https://cdn.brandfetch.io/id9x4bHuBz/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX',
  },

  // gaming
  {
    name: 'PlayStation Plus',
    image_url:
      'https://cdn.brandfetch.io/idg3kKx4_m/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX',
  },
  {
    name: 'Xbox Game Pass',
    image_url:
      'https://cdn.brandfetch.io/id90cFWkVl/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX',
  },
  {
    name: 'Nintendo Switch Online',
    image_url:
      'https://cdn.brandfetch.io/idIO2NISmY/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX',
  },

  // fitness & wellness
  {
    name: 'Peloton',
    image_url:
      'https://cdn.brandfetch.io/idEKQUVdWh/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX',
  },
  {
    name: 'Apple Fitness+',
    image_url:
      'https://cdn.brandfetch.io/idTSjb4Cov/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX',
  },

  // news & media
  {
    name: 'The New York Times',
    image_url:
      'https://cdn.brandfetch.io/id96bKHLG3/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX',
  },
  {
    name: 'Medium',
    image_url:
      'https://cdn.brandfetch.io/idJ4e4s8Y3/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX',
  },

  // communication
  {
    name: 'Slack',
    image_url:
      'https://cdn.brandfetch.io/iduDa181eM/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX',
  },
  {
    name: 'Zoom',
    image_url:
      'https://cdn.brandfetch.io/idEUZCrXPV/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX',
  },
];

const psplusPlans = [
  {
    country: 'US',
    plan_name: 'Essential',
    plan_price: '9.99',
    currency: 'USD',
    sub_service_id: '0bbf61f7-8d43-4091-8c58-4ce364a6df63',
    billing_cycle: 'monthly',
  },
  {
    country: 'US',
    plan_name: 'Essential',
    plan_price: '79.99',
    currency: 'USD',
    sub_service_id: '0bbf61f7-8d43-4091-8c58-4ce364a6df63',
    billing_cycle: 'yearly',
  },
  {
    country: 'US',
    plan_name: 'Extra',
    plan_price: '14.99',
    currency: 'USD',
    sub_service_id: '0bbf61f7-8d43-4091-8c58-4ce364a6df63',
    billing_cycle: 'monthly',
  },
  {
    country: 'US',
    plan_name: 'Extra',
    plan_price: '134.99',
    currency: 'USD',
    sub_service_id: '0bbf61f7-8d43-4091-8c58-4ce364a6df63',
    billing_cycle: 'yearly',
  },
  {
    country: 'US',
    plan_name: 'Premium',
    plan_price: '17.99',
    currency: 'USD',
    sub_service_id: '0bbf61f7-8d43-4091-8c58-4ce364a6df63',
    billing_cycle: 'monthly',
  },
  {
    country: 'US',
    plan_name: 'Premium',
    plan_price: '159.99',
    currency: 'USD',
    sub_service_id: '0bbf61f7-8d43-4091-8c58-4ce364a6df63',
    billing_cycle: 'yearly',
  },
  {
    country: 'GB',
    plan_name: 'Essential',
    plan_price: '6.99',
    currency: 'GBP',
    sub_service_id: '0bbf61f7-8d43-4091-8c58-4ce364a6df63',
    billing_cycle: 'monthly',
  },
  {
    country: 'GB',
    plan_name: 'Essential',
    plan_price: '49.99',
    currency: 'GBP',
    sub_service_id: '0bbf61f7-8d43-4091-8c58-4ce364a6df63',
    billing_cycle: 'yearly',
  },
  {
    country: 'GB',
    plan_name: 'Extra',
    plan_price: '10.99',
    currency: 'GBP',
    sub_service_id: '0bbf61f7-8d43-4091-8c58-4ce364a6df63',
    billing_cycle: 'monthly',
  },
  {
    country: 'GB',
    plan_name: 'Extra',
    plan_price: '83.99',
    currency: 'GBP',
    sub_service_id: '0bbf61f7-8d43-4091-8c58-4ce364a6df63',
    billing_cycle: 'yearly',
  },
  {
    country: 'GB',
    plan_name: 'Premium',
    plan_price: '13.49',
    currency: 'GBP',
    sub_service_id: '0bbf61f7-8d43-4091-8c58-4ce364a6df63',
    billing_cycle: 'monthly',
  },
  {
    country: 'GB',
    plan_name: 'Premium',
    plan_price: '99.99',
    currency: 'GBP',
    sub_service_id: '0bbf61f7-8d43-4091-8c58-4ce364a6df63',
    billing_cycle: 'yearly',
  },
  {
    country: 'EU',
    plan_name: 'Essential',
    plan_price: '8.99',
    currency: 'EUR',
    sub_service_id: '0bbf61f7-8d43-4091-8c58-4ce364a6df63',
    billing_cycle: 'monthly',
  },
  {
    country: 'EU',
    plan_name: 'Essential',
    plan_price: '71.99',
    currency: 'EUR',
    sub_service_id: '0bbf61f7-8d43-4091-8c58-4ce364a6df63',
    billing_cycle: 'yearly',
  },
  {
    country: 'EU',
    plan_name: 'Extra',
    plan_price: '13.99',
    currency: 'EUR',
    sub_service_id: '0bbf61f7-8d43-4091-8c58-4ce364a6df63',
    billing_cycle: 'monthly',
  },
  {
    country: 'EU',
    plan_name: 'Extra',
    plan_price: '125.99',
    currency: 'EUR',
    sub_service_id: '0bbf61f7-8d43-4091-8c58-4ce364a6df63',
    billing_cycle: 'yearly',
  },
  {
    country: 'EU',
    plan_name: 'Premium',
    plan_price: '16.99',
    currency: 'EUR',
    sub_service_id: '0bbf61f7-8d43-4091-8c58-4ce364a6df63',
    billing_cycle: 'monthly',
  },
  {
    country: 'EU',
    plan_name: 'Premium',
    plan_price: '151.99',
    currency: 'EUR',
    sub_service_id: '0bbf61f7-8d43-4091-8c58-4ce364a6df63',
    billing_cycle: 'yearly',
  },
  {
    country: 'CA',
    plan_name: 'Essential',
    plan_price: '11.99',
    currency: 'CAD',
    sub_service_id: '0bbf61f7-8d43-4091-8c58-4ce364a6df63',
    billing_cycle: 'monthly',
  },
  {
    country: 'CA',
    plan_name: 'Essential',
    plan_price: '95.99',
    currency: 'CAD',
    sub_service_id: '0bbf61f7-8d43-4091-8c58-4ce364a6df63',
    billing_cycle: 'yearly',
  },
  {
    country: 'CA',
    plan_name: 'Extra',
    plan_price: '17.99',
    currency: 'CAD',
    sub_service_id: '0bbf61f7-8d43-4091-8c58-4ce364a6df63',
    billing_cycle: 'monthly',
  },
  {
    country: 'CA',
    plan_name: 'Extra',
    plan_price: '161.99',
    currency: 'CAD',
    sub_service_id: '0bbf61f7-8d43-4091-8c58-4ce364a6df63',
    billing_cycle: 'yearly',
  },
  {
    country: 'CA',
    plan_name: 'Premium',
    plan_price: '21.99',
    currency: 'CAD',
    sub_service_id: '0bbf61f7-8d43-4091-8c58-4ce364a6df63',
    billing_cycle: 'monthly',
  },
  {
    country: 'CA',
    plan_name: 'Premium',
    plan_price: '197.99',
    currency: 'CAD',
    sub_service_id: '0bbf61f7-8d43-4091-8c58-4ce364a6df63',
    billing_cycle: 'yearly',
  },
  {
    country: 'AU',
    plan_name: 'Essential',
    plan_price: '11.95',
    currency: 'AUD',
    sub_service_id: '0bbf61f7-8d43-4091-8c58-4ce364a6df63',
    billing_cycle: 'monthly',
  },
  {
    country: 'AU',
    plan_name: 'Essential',
    plan_price: '95.95',
    currency: 'AUD',
    sub_service_id: '0bbf61f7-8d43-4091-8c58-4ce364a6df63',
    billing_cycle: 'yearly',
  },
  {
    country: 'AU',
    plan_name: 'Extra',
    plan_price: '18.95',
    currency: 'AUD',
    sub_service_id: '0bbf61f7-8d43-4091-8c58-4ce364a6df63',
    billing_cycle: 'monthly',
  },
  {
    country: 'AU',
    plan_name: 'Extra',
    plan_price: '154.95',
    currency: 'AUD',
    sub_service_id: '0bbf61f7-8d43-4091-8c58-4ce364a6df63',
    billing_cycle: 'yearly',
  },
  {
    country: 'AU',
    plan_name: 'Premium',
    plan_price: '22.95',
    currency: 'AUD',
    sub_service_id: '0bbf61f7-8d43-4091-8c58-4ce364a6df63',
    billing_cycle: 'monthly',
  },
  {
    country: 'AU',
    plan_name: 'Premium',
    plan_price: '194.95',
    currency: 'AUD',
    sub_service_id: '0bbf61f7-8d43-4091-8c58-4ce364a6df63',
    billing_cycle: 'yearly',
  },
];

const seed = async () => {
  console.log('🌱 seeding database...');

  try {
    await db.insert(sub_plan).values(psplusPlans);
    console.log('✅ services seeded successfully');
  } catch (error) {
    console.error('❌ error seeding services:', error);
    throw error;
  }

  console.log('✨ seeding complete');
  process.exit(0);
};

seed();
