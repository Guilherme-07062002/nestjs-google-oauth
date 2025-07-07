import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestMethod } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('auth', {
    exclude: [{ path: '', method: RequestMethod.GET }],
  });
  app.enableCors({
    origin: 'http://localhost:3000', // Permite requisições do frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Permite cookies e cabeçalhos de autenticação
  });
  await app.listen(3000);
}
bootstrap();
