import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const PREFIX = 'api';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors({
    origin: configService.getOrThrow('CLIENT_URL'),
    credentials: true,
  });
  app.setGlobalPrefix(PREFIX);
  const port = configService.getOrThrow('PORT');

  const config = new DocumentBuilder()
    .setTitle('SocApp API')
    .setDescription('The Rest API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port ?? 8080);
  Logger.log(`Server running on http://localhost:${port}/${PREFIX}`);
  Logger.log(`Rest API documentation: http://localhost:${port}/docs`);
}
bootstrap();
