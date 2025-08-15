import { NotionPage, NotionPageId } from 'app/api/notion/approval/archive/entities';
import type {
  INotionPageRepository,
  INotionClientService,
} from 'app/api/notion/approval/archive/use-cases';
import {
  PageNotFoundError,
  DatabaseOperationError,
  NotionApiError,
} from 'app/api/notion/approval/archive/entities';

export class NotionPageRepository implements INotionPageRepository {
  constructor(
    private readonly notionClient: INotionClientService,
    private readonly requestDatabaseId: string,
    private readonly archiveDatabaseId: string,
  ) {}

  async findById(pageId: NotionPageId): Promise<NotionPage> {
    try {
      const pageData = await this.notionClient.getPage(pageId.value);

      if (!this.isValidPageData(pageData)) {
        throw new PageNotFoundError(pageId.value);
      }

      return NotionPage.fromNotionData(pageData);
    } catch (error) {
      if (error instanceof PageNotFoundError) {
        throw error;
      }

      if (error instanceof NotionApiError) {
        if (error.statusCode === 404) {
          throw new PageNotFoundError(pageId.value);
        }
        throw new DatabaseOperationError(`Failed to retrieve page: ${error.message}`);
      }

      throw new DatabaseOperationError(
        `Failed to retrieve page: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }

  async archive(page: NotionPage): Promise<NotionPage> {
    try {
      await this.notionClient.updatePage(page.id.value, { archived: true });
      return page.archive();
    } catch (error) {
      throw new DatabaseOperationError(
        `Failed to archive page: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }

  async createInArchiveDatabase(page: NotionPage): Promise<NotionPage> {
    try {
      const archiveProperties = this.buildArchiveProperties(page);

      const result = await this.notionClient.createPage({
        parent: { database_id: this.archiveDatabaseId },
        properties: archiveProperties,
      });

      // Return a new NotionPage with the archive database ID
      return new NotionPage(
        new NotionPageId(result.id),
        page.title,
        false, // Not archived in archive DB
        page.isApprovalCompleted,
        this.archiveDatabaseId,
        archiveProperties,
      );
    } catch (error) {
      throw new DatabaseOperationError(
        `Failed to create page in archive database: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }

  async findCompletedPagesInDatabase(databaseId: string): Promise<NotionPage[]> {
    try {
      const filter = {
        property: '결재 완료',
        checkbox: { equals: true },
      };

      const response = await this.notionClient.queryDatabase(databaseId, filter);
      const pages: NotionPage[] = [];

      for (const pageData of response.results) {
        if (this.isValidPageData(pageData)) {
          pages.push(NotionPage.fromNotionData(pageData));
        }
      }

      return pages;
    } catch (error) {
      throw new DatabaseOperationError(
        `Failed to query database: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }

  private isValidPageData(data: unknown): data is {
    id: string;
    archived: boolean;
    properties: Record<string, unknown>;
    parent?: { database_id?: string };
  } {
    return (
      typeof data === 'object' &&
      data !== null &&
      typeof (data as { id?: unknown }).id === 'string' &&
      typeof (data as { archived?: unknown }).archived === 'boolean' &&
      typeof (data as { properties?: unknown }).properties === 'object'
    );
  }

  private buildArchiveProperties(page: NotionPage): Record<string, unknown> {
    const props = page.properties as Record<string, unknown>;

    // Extract values using type-safe helpers
    const title = this.extractTitle(props);
    const department = this.extractSelectValue(props['부서']);
    const issueDate = this.extractDateValue(props['발급일자']);
    const documentType = this.extractSelectValue(props['종류']);
    const issueNumber = this.extractRichText(props['발급번호']);
    const quantity = this.extractSelectValue(props['수량']);
    const purpose = this.extractSelectValue(props['제출용도']);
    const directorApproval = this.extractCheckboxValue(props['결재 - 본부장']);
    const ceoApproval = this.extractCheckboxValue(props['결재 - CEO']);
    const completionDate = this.extractDateValue(props['결재 완료일']) || this.todayISO();

    const archiveProps: Record<string, unknown> = {
      이름: {
        type: 'title',
        title: [{ type: 'text', text: { content: title } }],
      },
      '결재 완료': {
        type: 'checkbox',
        checkbox: true,
      },
    };

    // Add optional properties
    if (department) archiveProps['부서'] = { type: 'select', select: { name: department } };
    if (issueDate) archiveProps['발급일자'] = { type: 'date', date: { start: issueDate } };
    if (documentType) archiveProps['종류'] = { type: 'select', select: { name: documentType } };
    if (issueNumber)
      archiveProps['발급번호'] = {
        type: 'rich_text',
        rich_text: [{ type: 'text', text: { content: issueNumber } }],
      };
    if (quantity) archiveProps['수량'] = { type: 'select', select: { name: quantity } };
    if (purpose) archiveProps['제출용도'] = { type: 'select', select: { name: purpose } };
    if (typeof directorApproval === 'boolean')
      archiveProps['결재 - 본부장'] = { type: 'checkbox', checkbox: directorApproval };
    if (typeof ceoApproval === 'boolean')
      archiveProps['결재 - CEO'] = { type: 'checkbox', checkbox: ceoApproval };
    if (completionDate)
      archiveProps['결재 완료일'] = { type: 'date', date: { start: completionDate } };

    return archiveProps;
  }

  private extractTitle(props: Record<string, unknown>): string {
    const titleProp = props['이름'] as {
      title?: Array<{ plain_text?: string; text?: { content?: string } }>;
    };
    if (!titleProp?.title || titleProp.title.length === 0) {
      return '(제목 없음)';
    }

    return (
      titleProp.title
        .map((t) => t.plain_text || t.text?.content || '')
        .join('')
        .trim() || '(제목 없음)'
    );
  }

  private extractSelectValue(prop: unknown): string | undefined {
    const selectProp = prop as { select?: { name?: string } };
    return selectProp?.select?.name;
  }

  private extractDateValue(prop: unknown): string | undefined {
    const dateProp = prop as { date?: { start?: string } };
    return dateProp?.date?.start;
  }

  private extractRichText(prop: unknown): string | undefined {
    const richTextProp = prop as {
      rich_text?: Array<{ plain_text?: string; text?: { content?: string } }>;
    };
    if (!richTextProp?.rich_text || richTextProp.rich_text.length === 0) {
      return undefined;
    }

    return (
      richTextProp.rich_text
        .map((t) => t.plain_text || t.text?.content || '')
        .join('')
        .trim() || undefined
    );
  }

  private extractCheckboxValue(prop: unknown): boolean | undefined {
    const checkboxProp = prop as { checkbox?: boolean };
    return checkboxProp?.checkbox;
  }

  private todayISO(): string {
    return new Date().toISOString().slice(0, 10);
  }
}
