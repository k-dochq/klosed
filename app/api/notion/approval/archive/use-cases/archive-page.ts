import type { NotionPage } from 'app/api/notion/approval/archive/entities';
import {
  ArchivePageRequest,
  PageNotFoundError,
  PageNotArchivableError,
} from 'app/api/notion/approval/archive/entities';
import type { INotionPageRepository, ILoggerService, ArchiveResult } from './interfaces';

export class ArchivePageUseCase {
  constructor(
    private readonly pageRepository: INotionPageRepository,
    private readonly logger: ILoggerService,
  ) {}

  async execute(request: ArchivePageRequest): Promise<ArchiveResult> {
    const { pageId, requestId } = request;

    this.logger.log('archive_page_start', {
      pageId: pageId.value,
      requestId,
    });

    try {
      // 1. Retrieve the page
      const page = await this.pageRepository.findById(pageId);

      this.logger.log('page_retrieved', {
        pageId: pageId.value,
        requestId,
        isArchived: page.isArchived,
        isApprovalCompleted: page.isApprovalCompleted,
      });

      // 2. Check if page can be archived
      if (!page.canBeArchived()) {
        const reason = this.getArchiveFailureReason(page);
        this.logger.warn('archive_skipped', {
          pageId: pageId.value,
          requestId,
          reason,
        });

        return {
          success: false,
          reason,
          pageId: pageId.value,
        };
      }

      // 3. Create copy in archive database
      const copiedPage = await this.pageRepository.createInArchiveDatabase(page);

      this.logger.log('archive_copy_created', {
        pageId: pageId.value,
        requestId,
        copiedPageId: copiedPage.id.value,
      });

      // 4. Archive original page
      await this.pageRepository.archive(page);

      this.logger.log('original_page_archived', {
        pageId: pageId.value,
        requestId,
      });

      return {
        success: true,
        archivedPageId: pageId.value,
        copiedToPageId: copiedPage.id.value,
      };
    } catch (error) {
      this.logger.error('archive_page_error', {
        pageId: pageId.value,
        requestId,
        error: error instanceof Error ? error.message : 'Unknown error',
      });

      if (error instanceof PageNotFoundError) {
        return {
          success: false,
          reason: 'Page not found',
          pageId: pageId.value,
        };
      }

      if (error instanceof PageNotArchivableError) {
        return {
          success: false,
          reason: 'Page cannot be archived',
          pageId: pageId.value,
        };
      }

      throw error; // Re-throw unexpected errors
    }
  }

  private getArchiveFailureReason(page: NotionPage): string {
    if (page.isArchived) {
      return 'Page is already archived';
    }

    if (!page.isApprovalCompleted) {
      return 'Approval process not completed';
    }

    return 'Page cannot be archived';
  }
}
