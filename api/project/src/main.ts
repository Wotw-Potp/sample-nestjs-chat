import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configProviders } from './config/config.providers';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: configProviders.clientAppUrl },
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(configProviders.serverPort);
}
bootstrap();
