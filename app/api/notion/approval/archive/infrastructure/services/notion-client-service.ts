import type { Client } from '@notionhq/client';
import type { INotionClientService } from 'app/api/notion/approval/archive/use-cases';
import { NotionApiError } from 'app/api/notion/approval/archive/entities';

export class NotionClientService implements INotionClientService {
  constructor(private readonly client: Client) {}

  async getPage(pageId: string): Promise<unknown> {
    try {
      return await this.client.pages.retrieve({ page_id: pageId });
    } catch (error) {
      throw this.convertToNotionApiError(error, 'Failed to retrieve page');
    }
  }

  async createPage(data: {
    parent: { database_id: string };
    properties: Record<string, unknown>;
  }): Promise<{ id: string }> {
    try {
      const result = await this.client.pages.create(
        data as Parameters<typeof this.client.pages.create>[0],
      );
      return { id: result.id };
    } catch (error) {
      throw this.convertToNotionApiError(error, 'Failed to create page');
    }
  }

  async updatePage(pageId: string, data: { archived: boolean }): Promise<void> {
    try {
      await this.client.pages.update({
        page_id: pageId,
        archived: data.archived,
      });
    } catch (error) {
      throw this.convertToNotionApiError(error, 'Failed to update page');
    }
  }

  async queryDatabase(
    databaseId: string,
    filter?: unknown,
  ): Promise<{ results: unknown[]; has_more: boolean; next_cursor?: string }> {
    try {
      const result = await this.client.databases.query({
        database_id: databaseId,
        filter: filter as Parameters<typeof this.client.databases.query>[0]['filter'],
      });

      return {
        results: result.results,
        has_more: result.has_more,
        next_cursor: result.next_cursor ?? undefined,
      };
    } catch (error) {
      throw this.convertToNotionApiError(error, 'Failed to query database');
    }
  }

  private convertToNotionApiError(error: unknown, context: string): NotionApiError {
    if (error instanceof Error) {
      // Extract status code if available (Notion API errors often include this)
      const statusCode = (error as unknown as { status?: number }).status;
      return new NotionApiError(`${context}: ${error.message}`, statusCode);
    }

    return new NotionApiError(`${context}: Unknown error`);
  }
}
