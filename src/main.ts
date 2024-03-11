import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { GlobalExceptionFilter } from './common/exeptions/global-exception.filter';
import { SwaggerHelper } from './common/helpers/swagger.helper';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('My Nest')
    .setDescription('For my Nest API description')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerHelper.setDefaultResponses(document);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      //всі методи будуть згорнуті
      docExpansion: 'none',
      // розгортаються тільки перші рівні моделей
      defaultModelsExpandDepth: 1,
      //Swagger буде зберігати токени авторизації між запитами, що дозволяє користувачам переглядати захищені ресурси без необхідності авторизуватися щоразу
      persistAuthorization: true,
    },
  });
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  const configService = app.get(ConfigService);
  const appConfig = configService.get('app');
  await app.listen(appConfig.port);
}
bootstrap().then();
