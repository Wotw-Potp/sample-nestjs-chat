import { DataSourceOptions } from 'typeorm';
import { config } from './config.service';

interface ConfigProviders {
  databaseOptions: DataSourceOptions;
  serverPort: number;
  clientAppUrl: string;
}

export const configProviders: ConfigProviders = {
  databaseOptions: {
    type: 'postgres',
    host: 'snc-database__container',
    port: parseInt(config.get('POSTGRES_PORT', '5432')),
    database: config.get('POSTGRES_DB', 'database'),
    username: config.get('POSTGRES_USER', 'admin'),
    password: config.get('POSTGRES_PASSWORD'),
    entities: [__dirname + '/../**/*.entity.{ts,js}'],
    synchronize: config.get('MODE', 'development') !== 'production',
  },
  serverPort: parseInt(config.get('APP_PORT', '8000')),
  clientAppUrl: config.get('FRONT_APP_URL', 'http://localhost:3000'),
};
