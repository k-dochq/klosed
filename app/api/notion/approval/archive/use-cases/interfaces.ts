import type { NotionPage, NotionPageId } from 'app/api/notion/approval/archive/entities';

// Repository Interfaces
export interface INotionPageRepository {
  findById(pageId: NotionPageId): Promise<NotionPage>;
  archive(page: NotionPage): Promise<NotionPage>;
  createInArchiveDatabase(page: NotionPage): Promise<NotionPage>;
  findCompletedPagesInDatabase(databaseId: string): Promise<NotionPage[]>;
}

// Service Interfaces
export interface INotionClientService {
  getPage(pageId: string): Promise<unknown>;
  createPage(data: {
    parent: { database_id: string };
    properties: Record<string, unknown>;
  }): Promise<{ id: string }>;
  updatePage(pageId: string, data: { archived: boolean }): Promise<void>;
  queryDatabase(
    databaseId: string,
    filter?: unknown,
  ): Promise<{ results: unknown[]; has_more: boolean; next_cursor?: string }>;
}

export interface ILoggerService {
  log(event: string, data: Record<string, unknown>): void;
  warn(event: string, data: Record<string, unknown>): void;
  error(event: string, data: Record<string, unknown>): void;
}

// Result Types
export type ArchiveResult =
  | {
      success: true;
      archivedPageId: string;
      copiedToPageId: string;
    }
  | {
      success: false;
      reason: string;
      pageId?: string;
    };

export type WebhookProcessResult =
  | {
      success: true;
      pageId: string;
      result: ArchiveResult;
    }
  | {
      success: false;
      pageId?: string;
      error: string;
      errorId?: string;
    };

export type ScanResult = {
  success: true;
  processed: number;
  results: Array<{
    pageId: string;
    result: ArchiveResult;
  }>;
};
