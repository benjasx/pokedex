import { setServers } from 'node:dns/promises';

// Forzar servidores DNS explícitamente antes de conectar
setServers(['1.1.1.1', '8.8.8.8']);
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Set a global prefix for all routes
  app.setGlobalPrefix('api/v2');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        exposeUnsetFields: false,
        enableImplicitConversion: true,
      },
    }),
  );
  await app.listen(process.env.PORT!);
  console.log(`Application running on port ${process.env.PORT}`);
}
bootstrap();
