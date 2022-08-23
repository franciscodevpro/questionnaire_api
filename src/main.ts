import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { serve, setup } from 'swagger-ui-express';
import swaggerConfig from './docs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use('/api-docs', serve, setup(swaggerConfig));
  await app.listen(3000);
}
bootstrap();
