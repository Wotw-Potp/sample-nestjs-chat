import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configProviders } from 'src/config/config.providers';

@Module({
  imports: [TypeOrmModule.forRoot(configProviders.databaseOptions)],
})
export class DatabaseModule {}
