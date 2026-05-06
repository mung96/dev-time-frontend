import 'dotenv/config';
import { DataSource } from 'typeorm';

export const dataSourceOptions = {
  type: 'mysql' as const,
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_DATABASE || 'devtime',
};

export default new DataSource({
  ...dataSourceOptions,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
});
