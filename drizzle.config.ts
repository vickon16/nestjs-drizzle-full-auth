import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/schemas/*.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    host: process.env.POSTGRES_HOST!,
    password: process.env.POSTGRES_PASSWORD!,
    port: Number(process.env.POSTGRES_PORT)!,
    user: process.env.POSTGRES_USER!,
    database: process.env.POSTGRES_DB!,
    ssl: false,
  },
});
