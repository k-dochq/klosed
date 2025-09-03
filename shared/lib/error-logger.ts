interface ErrorLogEntry {
  level: 'error' | 'warn' | 'info';
  message: string;
  error?: Error;
  endpoint: string;
  method: string;
  timestamp: string;
  requestId?: string;
  userId?: string;
  ip?: string;
  userAgent?: string;
  digest?: string;
}

export class RouteErrorLogger {
  private static instance: RouteErrorLogger;

  static getInstance(): RouteErrorLogger {
    if (!RouteErrorLogger.instance) {
      RouteErrorLogger.instance = new RouteErrorLogger();
    }
    return RouteErrorLogger.instance;
  }

  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  logError(params: {
    error: Error;
    endpoint: string;
    method: string;
    request?: Request;
    userId?: string;
  }): string {
    const requestId = this.generateRequestId();

    const logEntry: ErrorLogEntry = {
      level: 'error',
      message: params.error.message,
      error: params.error,
      endpoint: params.endpoint,
      method: params.method,
      timestamp: new Date().toISOString(),
      requestId,
      userId: params.userId,
      ip: this.extractIP(params.request),
      userAgent: params.request?.headers.get('user-agent') || undefined,

      digest: this.generateDigest(params.error),
    };

    // Console logging (구조화된 JSON)
    console.error(JSON.stringify(logEntry, null, 2));

    // 외부 로깅 서비스로 전송 (Sentry, DataDog 등)
    this.sendToExternalService(logEntry);

    return requestId;
  }

  logWarn(params: {
    message: string;
    endpoint: string;
    method: string;
    request?: Request;
    userId?: string;
    additionalData?: Record<string, any>;
  }): void {
    const logEntry: ErrorLogEntry = {
      level: 'warn',
      message: params.message,
      endpoint: params.endpoint,
      method: params.method,
      timestamp: new Date().toISOString(),
      userId: params.userId,
      ip: this.extractIP(params.request),
      ...params.additionalData,
    };

    console.warn(JSON.stringify(logEntry));
    this.sendToExternalService(logEntry);
  }

  logInfo(params: {
    message: string;
    endpoint: string;
    method: string;
    request?: Request;
    userId?: string;
    additionalData?: Record<string, any>;
  }): void {
    const logEntry: ErrorLogEntry = {
      level: 'info',
      message: params.message,
      endpoint: params.endpoint,
      method: params.method,
      timestamp: new Date().toISOString(),
      userId: params.userId,
      ip: this.extractIP(params.request),
      ...params.additionalData,
    };

    console.info(JSON.stringify(logEntry));
    this.sendToExternalService(logEntry);
  }

  private extractIP(request?: Request): string | undefined {
    if (!request) return undefined;

    return (
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      request.headers.get('cf-connecting-ip') ||
      undefined
    );
  }

  private generateDigest(error: Error): string {
    const crypto = require('crypto');
    return crypto
      .createHash('sha256')
      .update(`${error.name}:${error.message}`)
      .digest('hex')
      .substring(0, 16);
  }

  private sendToExternalService(logEntry: ErrorLogEntry): void {
    // 실제 환경에서는 Sentry, DataDog, CloudWatch 등으로 전송
    if (process.env.NODE_ENV === 'production') {
      // Sentry 예시
      // Sentry.captureException(logEntry.error, {
      //   tags: {
      //     endpoint: logEntry.endpoint,
      //     method: logEntry.method
      //   },
      //   extra: logEntry
      // });
    }
  }
}

// 편의를 위한 싱글톤 인스턴스 export
export const routeErrorLogger = RouteErrorLogger.getInstance();
