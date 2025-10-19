import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

// Tell dotenv to look for the .env file in the current project root.
dotenv.config({ path: ".env" });

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in the environment variables. Make sure your .env file is in the root directory.");
}

export default {
  schema: "./src/server/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
} satisfies Config;
