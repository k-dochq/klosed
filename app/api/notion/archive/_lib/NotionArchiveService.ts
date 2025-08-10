import type { Client } from '@notionhq/client';
import type { Logger } from '@/shared/lib/logger';
import type { NotionProperty, ProcessResult, ScanResult } from './types';

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function normalizeId(id?: string): string | undefined {
  return id?.replace(/-/g, '');
}

function getSelectName(p: any): string | undefined {
  return p?.select?.name as string | undefined;
}

function getTitlePlain(p: any): string {
  const arr = p?.title as any[] | undefined;
  if (!arr || arr.length === 0) return '';
  return arr.map((t: any) => t.plain_text || t.text?.content || '').join('');
}

function getRichTextPlain(p: any): string | undefined {
  const arr = p?.rich_text as any[] | undefined;
  if (!arr || arr.length === 0) return undefined;
  return arr.map((t: any) => t.plain_text || t.text?.content || '').join('');
}

function getDateStart(p: any): string | undefined {
  return p?.date?.start as string | undefined;
}

function getCheckbox(p: any): boolean | undefined {
  const v = p?.checkbox;
  return typeof v === 'boolean' ? v : undefined;
}

function buildArchiveProps(sourceProps: NotionProperty): NotionProperty {
  const 이름 = getTitlePlain(sourceProps['이름']);
  const 부서 = getSelectName(sourceProps['부서']);
  const 발급일자 = getDateStart(sourceProps['발급일자']);
  const 종류 = getSelectName(sourceProps['종류']);
  const 발급번호 = getRichTextPlain(sourceProps['발급번호']);
  const 수량 = getSelectName(sourceProps['수량']);
  const 제출용도 = getSelectName(sourceProps['제출용도']);
  const 주임 = getCheckbox(sourceProps['결재 - 주임']);
  const 대리 = getCheckbox(sourceProps['결재 - 대리']);
  const 과장 = getCheckbox(sourceProps['결재 - 과장']);
  const 완료 = getCheckbox(sourceProps['결재 완료']) ?? true;
  const 완료일 = getDateStart(sourceProps['결재 완료일']) || todayISO();
  const 최종일 = getDateStart(sourceProps['결재 최종일']);

  const props: NotionProperty = {
    이름: { title: [{ type: 'text', text: { content: 이름 || '(제목 없음)' } }] },
    '결재 완료': { checkbox: !!완료 },
  };
  if (부서) props['부서'] = { select: { name: 부서 } };
  if (발급일자) props['발급일자'] = { date: { start: 발급일자 } };
  if (종류) props['종류'] = { select: { name: 종류 } };
  if (발급번호) props['발급번호'] = { rich_text: [{ type: 'text', text: { content: 발급번호 } }] };
  if (수량) props['수량'] = { select: { name: 수량 } };
  if (제출용도) props['제출용도'] = { select: { name: 제출용도 } };
  if (typeof 주임 === 'boolean') props['결재 - 주임'] = { checkbox: 주임 };
  if (typeof 대리 === 'boolean') props['결재 - 대리'] = { checkbox: 대리 };
  if (typeof 과장 === 'boolean') props['결재 - 과장'] = { checkbox: 과장 };
  if (완료일) props['결재 완료일'] = { date: { start: 완료일 } };
  if (최종일) props['결재 최종일'] = { date: { start: 최종일 } };
  return props;
}

export class NotionArchiveService {
  constructor(
    private readonly notion: Client,
    private readonly logger: Logger,
    private readonly requestDbId: string,
    private readonly archiveDbId: string,
  ) {}

  private async processSingle(id: string): Promise<ProcessResult> {
    const page: any = await this.notion.pages.retrieve({ page_id: id } as any);
    this.logger.log('page_retrieved', {
      id,
      archived: !!page?.archived,
      parentDbId: page?.parent?.database_id,
    });
    if (page.archived) {
      this.logger.warn('skip_already_archived', { id });
      return { ok: true, skipped: true, reason: 'already archived' } as const;
    }

    const parentDbId: string | undefined = page.parent?.database_id;
    if (parentDbId && normalizeId(parentDbId) !== normalizeId(this.requestDbId)) {
      this.logger.warn('db_mismatch', { id, parentDbId, expected: this.requestDbId });
      return { ok: false, error: 'Not a Requests DB item' } as const;
    }

    const props = page.properties as NotionProperty;
    const isDone = !!getCheckbox(props['결재 완료']);
    if (!isDone) {
      this.logger.warn('skip_not_completed', { id });
      return { ok: true, skipped: true, reason: '결재 완료 not checked' } as const;
    }

    const archiveProps = buildArchiveProps(props);
    this.logger.log('archive_create_start', { id });
    const created = await this.notion.pages.create({
      parent: { database_id: this.archiveDbId },
      properties: archiveProps,
    } as any);
    this.logger.log('archive_create_success', { id, archiveId: created.id });

    await this.notion.pages.update({ page_id: id, archived: true } as any);
    this.logger.log('source_archived', { id });
    return { ok: true, archived: id, copiedTo: created.id } as const;
  }

  async scanAndProcess(dbId?: string): Promise<ScanResult> {
    const targetDbId = dbId || this.requestDbId;
    let cursor: string | undefined = undefined;
    const results: Array<{
      id: string;
      status: ProcessResult | { ok: false; errorId?: string; error?: string };
    }> = [];
    let total = 0;
    do {
      const resp: any = await this.notion.databases.query({
        database_id: targetDbId,
        filter: { property: '결재 완료', checkbox: { equals: true } },
        start_cursor: cursor,
        page_size: 50,
      } as any);
      const pages: any[] = resp.results || [];
      cursor = resp.has_more ? resp.next_cursor : undefined;
      this.logger.log('scan_page', { count: pages.length, hasMore: !!cursor });
      for (const p of pages) {
        const id = p.id as string;
        total += 1;
        try {
          const r = await this.processSingle(id);
          results.push({ id, status: r });
        } catch (e: any) {
          const errorId = Math.random().toString(36).slice(2, 10);
          this.logger.error('scan_item_error', { errorId, id, error: e?.message });
          results.push({ id, status: { ok: false, errorId, error: e?.message } });
        }
      }
    } while (cursor);
    return { ok: true, mode: 'scan', processed: total, results };
  }
}
