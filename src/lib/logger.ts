/**
 * Logger utilitaire avec support environnement
 * En production, les logs sont désactivés sauf les erreurs critiques
 */

type LogLevel = 'log' | 'info' | 'warn' | 'error' | 'debug';

const isDevelopment = process.env.NODE_ENV === 'development';

class Logger {
  private shouldLog(level: LogLevel): boolean {
    if (isDevelopment) return true;
    // En production, logger uniquement les erreurs
    return level === 'error';
  }

  log(...args: unknown[]): void {
    if (this.shouldLog('log')) {
      console.log('[GAM]', ...args);
    }
  }

  info(...args: unknown[]): void {
    if (this.shouldLog('info')) {
      console.info('[GAM INFO]', ...args);
    }
  }

  warn(...args: unknown[]): void {
    if (this.shouldLog('warn')) {
      console.warn('[GAM WARN]', ...args);
    }
  }

  error(...args: unknown[]): void {
    if (this.shouldLog('error')) {
      console.error('[GAM ERROR]', ...args);
      // TODO: Envoyer à Sentry/service de monitoring en production
    }
  }

  debug(...args: unknown[]): void {
    if (this.shouldLog('debug')) {
      console.debug('[GAM DEBUG]', ...args);
    }
  }
}

export const logger = new Logger();
