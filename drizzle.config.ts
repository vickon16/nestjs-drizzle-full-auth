import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';

export default defineConfig({
  schema: './src/database/schemas/index.ts',
  out: './src/database/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    // this
    // url: process.env.DATABASE_URL,
    // ssl: true,
    // or
    host: process.env.POSTGRES_HOST!,
    password: process.env.POSTGRES_PASSWORD!,
    port: Number(process.env.POSTGRES_PORT)!,
    user: process.env.POSTGRES_USER!,
    database: process.env.POSTGRES_DB!,
    ssl: false,
  },
});
