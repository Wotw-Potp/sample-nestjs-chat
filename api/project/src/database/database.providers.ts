import { configProviders } from 'src/config/config.providers';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource(configProviders.databaseOptions);
      return await dataSource.initialize();
    },
  },
];
