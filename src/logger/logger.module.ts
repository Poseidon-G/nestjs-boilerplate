import { Module, Global } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { LoggerConfig } from './logger.config';
const logger: LoggerConfig = new LoggerConfig();

@Global()
@Module({
  imports: [WinstonModule.forRoot(logger.console())],
})
export class LoggerModule {}
