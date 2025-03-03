import { defineConfig } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';
import { config } from 'dotenv';

config();

export default defineConfig({
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  dbName: process.env.DATABASE_NAME,
  entities: ['dist/**/*.schema.js'],
  entitiesTs: ['./**/*.schema.ts'],
  migrations: {
    path: 'dist/database/migrations',
    pathTs: 'src/database/migrations',
    disableForeignKeys: false,
  },
  debug: process.env.NODE_ENV === 'development',
  extensions: [Migrator],
});
