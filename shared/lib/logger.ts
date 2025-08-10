type LogLevel = 'log' | 'warn' | 'error';

export type Logger = {
  log: (event: string, payload?: Record<string, unknown>) => void;
  warn: (event: string, payload?: Record<string, unknown>) => void;
  error: (event: string, payload?: Record<string, unknown>) => void;
};

export function createLogger(scope: string): Logger {
  function emit(level: LogLevel, event: string, payload: Record<string, unknown> = {}) {
    const entry = {
      ts: new Date().toISOString(),
      scope,
      event,
      ...payload,
    };
    // eslint-disable-next-line no-console
    (console[level] || console.log)(`[${scope}] ${event} ${JSON.stringify(entry)}`);
  }

  return {
    log: (event, payload) => emit('log', event, payload || {}),
    warn: (event, payload) => emit('warn', event, payload || {}),
    error: (event, payload) => emit('error', event, payload || {}),
  };
}
