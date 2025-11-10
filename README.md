# Subly Backend

A subscription management API built with Hono and Drizzle ORM. Manage subscription services, plans, and user subscriptions with authentication, currency conversion, and analytics.

## Features

- **User Authentication** - Email/password authentication with email verification via better-auth
- **Subscription Management** - Track subscription services (Netflix, Spotify, etc.) and plans
- **User Subscriptions** - Manage user's active subscriptions with renewal tracking
- **Currency Conversion** - Multi-currency support with cached exchange rates
- **Statistics & Analytics** - User subscription overview and spending analytics
- **Edge-Ready** - Built with Hono for edge deployment compatibility

## Tech Stack

- **Runtime**: Bun
- **Framework**: Hono (edge-friendly web framework)
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: better-auth with Expo plugin
- **Validation**: Zod
- **Currency API**: ExchangeRate-API

## Getting Started

### Prerequisites

- Bun installed
- PostgreSQL database

### Installation

```bash
# install dependencies
bun install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/subly
EXCHANGE_RATE_API_PROVIDER=exchangerate-api
EXCHANGE_RATE_API_KEY=your_api_key_here
```

### Database Setup

```bash
# generate migrations
bunx drizzle-kit generate

# run migrations
bunx drizzle-kit migrate

# or push schema directly
bunx drizzle-kit push
```

### Development

```bash
# start development server
bun run dev
```

API available at `http://localhost:3000/api`

## Project Structure

```
src/
├── db/
│   ├── schemas/          # database schemas
│   │   ├── auth.ts       # better-auth tables
│   │   ├── sub-services.ts
│   │   ├── sub-plans.ts
│   │   ├── user-subscriptions.ts
│   │   └── currency-rates.ts
│   └── schema.ts         # schema exports
├── routes/               # api route definitions
├── services/             # business logic layer
│   ├── subscriptions/
│   └── statistics/
├── middleware/
│   ├── auth.ts          # auth context middleware
│   └── protected.ts     # route protection
├── lib/
│   ├── auth.ts          # better-auth config
│   ├── validator.ts     # validation wrapper
│   └── currency/        # currency conversion
├── providers/
│   └── currency/        # currency provider pattern
└── schemas/             # zod validation schemas
```

## API Routes

All routes are prefixed with `/api`:

### Authentication
- `/auth/*` - better-auth endpoints (login, signup, session)

### Session
- `/session` - session management

### Subscriptions
- `/subscriptions/services` - subscription services (Netflix, Spotify, etc.)
- `/subscriptions/plans` - subscription plans (tiers within services)
- `/subscriptions/user` - user's active subscriptions

### Statistics
- `/statistics` - analytics and user overview data

## Architecture

### Middleware Stack

1. **Global Middleware** (applied to all `/api/*` routes):
   - CORS
   - Error handler
   - Request logger
   - Auth middleware (attaches user to context)

2. **Route-Level Middleware**:
   - `requireAuth` - ensures user is authenticated
   - `requireVerifiedEmail` - ensures email is verified

### Database Schema

- **auth tables** - user, session, account, verification (better-auth)
- **sub_service** - subscription services
- **sub_plan** - subscription plans with relation to services
- **user_subscription** - user subscription records
- **currency_rate** - cached exchange rates

### Currency Conversion

The system uses a provider pattern for currency conversion:

1. Provider interface in `src/providers/currency/interface.ts`
2. Implementation for ExchangeRate-API
3. Conversion logic with database caching in `src/lib/currency/`
4. Flow: check cache → fetch from provider on miss → cache rate

### Code Patterns

**Route handlers:**
```typescript
subscriptions.get('/endpoint', requireAuth, handlerFunction);
subscriptions.post('/endpoint',
  validator('json', schema),
  requireAuth,
  handlerFunction
);
```

**Service layer:**
Business logic extracted to services, accessed via context:
```typescript
const user = c.get('user'); // from auth middleware
```

**Path aliases:**
Use `@/` for internal imports (mapped to `./src/`)

## Development

The project uses:
- TypeScript for type safety
- Drizzle ORM for database operations with relations
- Zod for runtime validation
- better-auth for authentication with custom user fields

## License

[Your License Here]
