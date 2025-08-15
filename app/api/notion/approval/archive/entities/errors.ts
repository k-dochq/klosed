// Domain-specific errors that are independent of external libraries

export class InvalidPageDataError extends Error {
  constructor(message: string) {
    super(`Invalid page data: ${message}`);
    this.name = 'InvalidPageDataError';
  }
}

export class PageNotFoundError extends Error {
  constructor(pageId: string) {
    super(`Page with id ${pageId} not found`);
    this.name = 'PageNotFoundError';
  }
}

export class PageNotArchivableError extends Error {
  constructor(pageId: string) {
    super(`Page ${pageId} cannot be archived in current state`);
    this.name = 'PageNotArchivableError';
  }
}

export class InvalidArchiveRequestError extends Error {
  constructor(message: string) {
    super(`Invalid archive request: ${message}`);
    this.name = 'InvalidArchiveRequestError';
  }
}

export class DatabaseOperationError extends Error {
  constructor(message: string) {
    super(`Database operation failed: ${message}`);
    this.name = 'DatabaseOperationError';
  }
}

export class NotionApiError extends Error {
  constructor(
    message: string,
    public readonly statusCode?: number,
  ) {
    super(`Notion API error: ${message}`);
    this.name = 'NotionApiError';
  }
}

export class ArchiveOperationError extends Error {
  constructor(
    message: string,
    public readonly pageId?: string,
  ) {
    super(`Archive operation failed: ${message}`);
    this.name = 'ArchiveOperationError';
  }
}
