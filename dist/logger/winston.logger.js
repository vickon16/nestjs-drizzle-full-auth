"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.winstonLogger = void 0;
const winston_1 = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const { combine, colorize, errors, printf, timestamp } = winston_1.format;
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
exports.winstonLogger = (0, winston_1.createLogger)({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), errors({ stack: true }), logFormat),
    transports: [
        new winston_1.transports.Console({
            format: combine(colorize(), logFormat),
            silent: process.env.NODE_ENV === 'production',
        }),
        new DailyRotateFile({
            level: 'info',
            filename: 'application-%DATE%.log',
            ...dailyLogConfig,
        }),
        new DailyRotateFile({
            level: 'error',
            filename: 'error-%DATE%.log',
            ...dailyLogConfig,
        }),
    ],
});
//# sourceMappingURL=winston.logger.js.map