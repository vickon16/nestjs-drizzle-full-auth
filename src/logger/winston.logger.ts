import { createLogger, format, transports } from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

const { combine, colorize, errors, printf, timestamp } = format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

const dailyLogConfig = {
  dirname: 'logs',
  maxFiles: '14d',
  maxSize: '20m',
  zippedArchive: true,
  datePattern: 'YYYY-MM-DD',
};

export const winstonLogger = createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }), // handles error stack
    logFormat,
  ),
  transports: [
    // Console transport for development
    new transports.Console({
      format: combine(colorize(), logFormat),
      silent: process.env.NODE_ENV === 'production',
    }),
    // Daily rotation file for info level logs
    new DailyRotateFile({
      level: 'info',
      filename: 'application-%DATE%.log',
      ...dailyLogConfig,
    }),
    // Seperate error logs
    new DailyRotateFile({
      level: 'error',
      filename: 'error-%DATE%.log',
      ...dailyLogConfig,
    }),
  ],
});
