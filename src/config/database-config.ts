import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';

const databaseConfig: DataSourceOptions = {
  host: process.env.DATABASE_HOST,
  type: 'postgres',
  port: parseInt(process.env.DATABASE_PORT || '0000'),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + '/../**/entities/*.entity.ts'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  synchronize: true,
  logging: true,
  migrationsRun: false,
};

export default databaseConfig;
