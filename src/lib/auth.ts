import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { expo } from '@better-auth/expo';

// db
import { db } from '@/db';
import * as schema from '@/db/schemas/auth';

// utils
import { sendEmail } from '@/utils/send-email';

export const auth = betterAuth({
  plugins: [expo()],
  trustedOrigins: ['subly://*'],
  session: {
    expiresIn: 60 * 60 * 24 * 30, // Example: 30 days session
    updateAge: 60 * 60 * 24, // Example: Update every 1 day on use
  },
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: schema,
  }),
  user: {
    additionalFields: {
      country: {
        input: true,
      },
      baseCurrency: {
        input: true,
      },
    },
    deleteUser: {
      enabled: true,
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url, token }) => {
      await sendEmail({
        to: user.email,
        subject: 'Reset your password',
        text: `Click the link to reset your password: ${url} and here's your token ${token}`,
      });
    },
    onPasswordReset: async ({ user }) => {
      // your logic here
      console.log(`Password for user ${user.email} has been reset.`);
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url, token }) => {
      await sendEmail({
        to: user.email,
        subject: 'Verify your email address',
        text: `Click the link to verify your email: ${url} and here's your token ${token}`,
      });
    },
    async afterEmailVerification(user) {
      // Your custom logic here, e.g., grant access to premium features
      console.log(`${user.email} has been successfully verified!`);
    },
  },
});
