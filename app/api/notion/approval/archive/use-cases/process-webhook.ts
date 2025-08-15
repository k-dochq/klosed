import { ArchivePageRequest } from 'app/api/notion/approval/archive/entities';
import type { ILoggerService, WebhookProcessResult } from './interfaces';
import { ArchivePageUseCase } from './archive-page';

export class ProcessWebhookUseCase {
  constructor(
    private readonly archivePageUseCase: ArchivePageUseCase,
    private readonly logger: ILoggerService,
  ) {}

  async execute(request: ArchivePageRequest): Promise<WebhookProcessResult> {
    const { pageId, requestId, propertyName } = request;

    this.logger.log('webhook_process_start', {
      pageId: pageId.value,
      requestId,
      propertyName,
    });

    try {
      // Check if this is a relevant property change
      if (propertyName && propertyName !== '결재 완료') {
        this.logger.log('webhook_property_skipped', {
          pageId: pageId.value,
          requestId,
          propertyName,
        });

        return {
          success: false,
          pageId: pageId.value,
          error: `Property ${propertyName} is not relevant for archiving`,
        };
      }

      // Execute the archive operation
      const archiveResult = await this.archivePageUseCase.execute(request);

      this.logger.log('webhook_process_complete', {
        pageId: pageId.value,
        requestId,
        success: archiveResult.success,
      });

      return {
        success: true,
        pageId: pageId.value,
        result: archiveResult,
      };
    } catch (error) {
      const errorId = Math.random().toString(36).slice(2, 10);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';

      this.logger.error('webhook_process_error', {
        errorId,
        pageId: pageId.value,
        requestId,
        propertyName,
        error: errorMessage,
      });

      return {
        success: false,
        pageId: pageId.value,
        error: errorMessage,
        errorId,
      };
    }
  }
}
