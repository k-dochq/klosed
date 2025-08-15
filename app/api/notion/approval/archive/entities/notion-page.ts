import {
  InvalidPageDataError,
  PageNotArchivableError,
} from 'app/api/notion/approval/archive/entities/errors';

export class NotionPageId {
  constructor(public readonly value: string) {
    if (!value || value.trim().length === 0) {
      throw new InvalidPageDataError('Page ID cannot be empty');
    }
  }

  equals(other: NotionPageId): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}

export enum ApprovalStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export class NotionPage {
  constructor(
    public readonly id: NotionPageId,
    public readonly title: string,
    public readonly isArchived: boolean,
    public readonly isApprovalCompleted: boolean,
    public readonly databaseId: string,
    public readonly properties: Record<string, unknown>,
  ) {
    this.validateTitle(title);
  }

  canBeArchived(): boolean {
    if (this.isArchived) {
      return false;
    }

    if (!this.isApprovalCompleted) {
      return false;
    }

    return true;
  }

  archive(): NotionPage {
    if (!this.canBeArchived()) {
      throw new PageNotArchivableError(this.id.value);
    }

    return new NotionPage(
      this.id,
      this.title,
      true, // archived
      this.isApprovalCompleted,
      this.databaseId,
      this.properties,
    );
  }

  private validateTitle(title: string): void {
    if (!title || title.trim().length === 0) {
      throw new InvalidPageDataError('Page title cannot be empty');
    }
  }

  static fromNotionData(data: {
    id: string;
    archived: boolean;
    properties: Record<string, unknown>;
    parent?: { database_id?: string };
  }): NotionPage {
    const pageId = new NotionPageId(data.id);
    const title = extractTitle(data.properties);
    const isApprovalCompleted = extractApprovalStatus(data.properties);
    const databaseId = data.parent?.database_id || '';

    return new NotionPage(
      pageId,
      title,
      data.archived,
      isApprovalCompleted,
      databaseId,
      data.properties,
    );
  }
}

// Helper functions to extract data from Notion properties
function extractTitle(properties: Record<string, unknown>): string {
  const titleProp = properties['이름'] as {
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

function extractApprovalStatus(properties: Record<string, unknown>): boolean {
  const approvalProp = properties['결재 완료'] as { checkbox?: boolean };
  return Boolean(approvalProp?.checkbox);
}
