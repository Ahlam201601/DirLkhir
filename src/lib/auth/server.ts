import { db } from "@/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL?.trim() ?? "http://localhost:3000";

const secret = process.env.BETTER_AUTH_SECRET;
if (!secret || secret.length < 32) {
  throw new Error(
    "BETTER_AUTH_SECRET must be set and at least 32 characters. Run: openssl rand -base64 32"
  );
}

export const auth = betterAuth({
  baseURL,
  secret: process.env.BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: [baseURL],
  plugins: [nextCookies()],
});
