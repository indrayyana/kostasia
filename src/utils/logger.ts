/* eslint-disable @typescript-eslint/no-explicit-any */
import { format, addColors, createLogger, transports } from 'winston';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
};

const customFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  format.json(),
  format.errors({ stack: true })
);

const devConsoleFormat = format.combine(
  format.colorize({ all: true }),
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  format.printf((info) => {
    const metadata =
      info.metadata && Object.keys(info.metadata).length
        ? `\n${JSON.stringify(info.metadata, null, 2)}`
        : '';

    return `${info.timestamp} ${info.level}: ${info.message}${
      info.stack || ''
    }${metadata}`;
  })
);

addColors(colors);

const customTransports = [
  ...(process.env.NODE_ENV !== 'production'
    ? [
        new transports.Console({
          format: devConsoleFormat,
        }),
      ]
    : [
        new transports.Console({
          level: 'error',
        }),
      ]),
];

const logger = createLogger({
  level:
    process.env.LOG_LEVEL ||
    (process.env.NODE_ENV === 'production' ? 'info' : 'debug'),
  levels,
  format: customFormat,
  defaultMeta: { service: 'next-app' },
  transports: customTransports,
  exitOnError: false,
});

function sanitizeLog(obj: any): any {
  if (!obj) return obj;
  return JSON.parse(
    JSON.stringify(obj, (key, value) => {
      if (
        ['password', 'token', 'secret', 'authorization'].includes(
          key.toLowerCase()
        )
      ) {
        return '[REDACTED]';
      }
      return value;
    })
  );
}

/* eslint-disable import/no-anonymous-default-export */
export default {
  error: (message: string, meta: Record<string, any> = {}): void => {
    logger.error(message, { metadata: sanitizeLog(meta) });
  },
  warn: (message: string, meta: Record<string, any> = {}): void => {
    logger.warn(message, { metadata: sanitizeLog(meta) });
  },
  info: (message: string, meta: Record<string, any> = {}): void => {
    logger.info(message, { metadata: sanitizeLog(meta) });
  },
  http: (message: string, meta: Record<string, any> = {}): void => {
    logger.http(message, { metadata: sanitizeLog(meta) });
  },
  debug: (message: string, meta: Record<string, any> = {}): void => {
    logger.debug(message, { metadata: sanitizeLog(meta) });
  },
};

