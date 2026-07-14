const isDev = (import.meta as any).env?.DEV || process.env.NODE_ENV === 'development';

export const log = {
  dev: (...args: any[]) => {
    if (isDev) {
      console.log('[DEV]', ...args);
    }
  },
  warn: (...args: any[]) => {
    if (isDev) {
      console.warn('[WARN]', ...args);
    }
  },
  error: (...args: any[]) => {
    console.error('[ERROR]', ...args);
  }
};
