import winston, { format, transports } from "winston";

export class LoggerConfig {
    private readonly options: winston.LoggerOptions;
    constructor() {
        this.options = {
            level: 'info',
            format: format.combine(
                format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                format.label({
                    label: '💀',
                }),
                format.printf(info => `${info.timestamp} ${info.label} ${info.level}: ${info.message}`),
                format.align()
            ),
            transports: [
                new transports.Console(),
                new transports.File({ filename: 'logs/error.log', level: 'error' }),
            ],
        };
    }

    public console(): object {
        return this.options;
    }
}