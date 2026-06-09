import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validação global dos DTOs (class-validator / class-transformer)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove propriedades não declaradas nos DTOs
      forbidNonWhitelisted: true, // erro se enviar propriedade desconhecida
      transform: true, // converte payloads para as instâncias dos DTOs
    }),
  );

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Cinema API')
    .setDescription(
      'API REST do sistema de Cinema (NestJS 11 + Prisma + PostgreSQL)',
    )
    .setVersion('1.0')
    .addTag('cinemas')
    .addTag('salas')
    .addTag('filmes')
    .addTag('sessoes')
    .addTag('ingressos')
    .addTag('lanche-combos')
    .addTag('pedidos')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // rota /api

  await app.listen(3000);
  console.log(`Aplicação rodando em: http://localhost:3000`);
  console.log(`Swagger disponível em: http://localhost:3000/api`);
}
bootstrap();
