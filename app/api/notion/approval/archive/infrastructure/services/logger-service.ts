import type { Logger } from '@/shared/lib/logger';
import type { ILoggerService } from 'app/api/notion/approval/archive/use-cases';

export class LoggerService implements ILoggerService {
  constructor(private readonly logger: Logger) {}

  log(event: string, data: Record<string, unknown>): void {
    this.logger.log(event, data);
  }

  warn(event: string, data: Record<string, unknown>): void {
    this.logger.warn(event, data);
  }

  error(event: string, data: Record<string, unknown>): void {
    this.logger.error(event, data);
  }
}
