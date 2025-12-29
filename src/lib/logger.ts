/**
 * Production-safe logger utility
 * Only logs to console in development mode to prevent
 * exposing implementation details in production
 */
export const logger = {
  error: (...args: unknown[]) => {
    if (import.meta.env.DEV) {
      console.error(...args);
    }
    // In production, errors could be sent to an error tracking service
  },
  warn: (...args: unknown[]) => {
    if (import.meta.env.DEV) {
      console.warn(...args);
    }
  },
  log: (...args: unknown[]) => {
    if (import.meta.env.DEV) {
      console.log(...args);
    }
  },
};
