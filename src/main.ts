import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
import { HttpExceptionFilter } from './pipe/http-exception.filter';
import { HttpAdapterHost } from '@nestjs/core';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
// import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const a = 1;
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const httpAdapterHost = app.get(HttpAdapterHost);
  //use custom logger winston for exception filter
  const logger = app.get(WINSTON_MODULE_PROVIDER);

  //use logger default nestjs exception filter
  // const logger = new Logger();

  app.useGlobalFilters(new HttpExceptionFilter(httpAdapterHost, logger));

  app.setGlobalPrefix(configService.get('server.apiPrefix'));
  app.use(morgan('dev'));

  const config = new DocumentBuilder()
    .setTitle('API init codebase')
    .setDescription('API init codebase docs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(configService.get('server.port'));
}
bootstrap();
