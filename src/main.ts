import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerModule } from './logger/logger.module';
import * as morgan from 'morgan';
import { HttpExceptionFilter } from './pipe/http-exception.filter';
import { HttpAdapterHost } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new HttpExceptionFilter(httpAdapterHost));
  app.use(morgan('dev'));
  await app.listen(3000);
}
bootstrap();
