import { ScanRequest, ArchivePageRequest } from 'app/api/notion/approval/archive/entities';
import type { INotionPageRepository, ILoggerService, ScanResult } from './interfaces';
import { ArchivePageUseCase } from './archive-page';

export class ScanAndArchiveUseCase {
  constructor(
    private readonly pageRepository: INotionPageRepository,
    private readonly archivePageUseCase: ArchivePageUseCase,
    private readonly logger: ILoggerService,
  ) {}

  async execute(request: ScanRequest): Promise<ScanResult> {
    const { databaseId, requestId } = request;

    this.logger.log('scan_start', {
      databaseId,
      requestId,
    });

    try {
      // 1. Find all completed pages in the database
      const completedPages = await this.pageRepository.findCompletedPagesInDatabase(databaseId);

      this.logger.log('scan_pages_found', {
        databaseId,
        requestId,
        count: completedPages.length,
      });

      const results: Array<{ pageId: string; result: ScanResult['results'][0]['result'] }> = [];

      // 2. Process each completed page
      for (const page of completedPages) {
        try {
          const archiveRequest = new ArchivePageRequest(
            page.id,
            `${requestId}-${page.id.value.slice(-6)}`, // Sub-request ID
          );

          const archiveResult = await this.archivePageUseCase.execute(archiveRequest);

          results.push({
            pageId: page.id.value,
            result: archiveResult,
          });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';

          this.logger.error('scan_page_error', {
            pageId: page.id.value,
            requestId,
            error: errorMessage,
          });

          results.push({
            pageId: page.id.value,
            result: {
              success: false,
              reason: errorMessage,
              pageId: page.id.value,
            },
          });
        }
      }

      this.logger.log('scan_complete', {
        databaseId,
        requestId,
        processed: results.length,
        successful: results.filter((r) => r.result.success).length,
      });

      return {
        success: true,
        processed: results.length,
        results,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';

      this.logger.error('scan_error', {
        databaseId,
        requestId,
        error: errorMessage,
      });

      throw error; // Re-throw to be handled by controller
    }
  }
}
