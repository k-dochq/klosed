import { NotionPageId } from 'app/api/notion/approval/archive/entities/notion-page';
import { InvalidArchiveRequestError } from 'app/api/notion/approval/archive/entities/errors';

export class ArchivePageRequest {
  constructor(
    public readonly pageId: NotionPageId,
    public readonly requestId: string,
    public readonly propertyName?: string,
  ) {
    this.validateRequestId(requestId);
  }

  private validateRequestId(requestId: string): void {
    if (!requestId || requestId.trim().length === 0) {
      throw new InvalidArchiveRequestError('Request ID cannot be empty');
    }
  }

  static fromWebhook(data: { page_id: string; property_name?: string }): ArchivePageRequest {
    const requestId = Math.random().toString(36).slice(2, 10);
    return new ArchivePageRequest(new NotionPageId(data.page_id), requestId, data.property_name);
  }

  static fromDirect(data: { pageId: string; propertyName?: string }): ArchivePageRequest {
    const requestId = Math.random().toString(36).slice(2, 10);
    return new ArchivePageRequest(new NotionPageId(data.pageId), requestId, data.propertyName);
  }
}

export class ScanRequest {
  constructor(
    public readonly databaseId: string,
    public readonly requestId: string,
  ) {
    this.validateDatabaseId(databaseId);
  }

  private validateDatabaseId(databaseId: string): void {
    if (!databaseId || databaseId.trim().length === 0) {
      throw new InvalidArchiveRequestError('Database ID cannot be empty');
    }
  }

  static create(databaseId?: string): ScanRequest {
    const requestId = Math.random().toString(36).slice(2, 10);
    const defaultDbId = '5d8b167cceba424abd6894363fc79e1c'; // REQUEST_DB_ID

    return new ScanRequest(databaseId || defaultDbId, requestId);
  }
}
