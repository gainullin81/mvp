import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Включаем CORS для всех источников (или укажи origin, если нужно)
  app.enableCors({
    origin: '*', // или ['http://localhost:61034'] для безопасности
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Fixer API')
    .setDescription('API documentation for Fixer')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
