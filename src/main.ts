import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173', // กำหนด origin ของ frontend ที่ต้องการอนุญาต
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
