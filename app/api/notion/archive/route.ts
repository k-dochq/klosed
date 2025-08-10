import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

// Hardcoded credentials and database IDs per user's request
const NOTION_TOKEN = process.env.NOTION_TOKEN || '';
// Requests DB (발급대장 - 증명서 발급)
const REQUEST_DB_ID = '5d8b167cceba424abd6894363fc79e1c';
// Archive DB (발급대장 - 보관)
const ARCHIVE_DB_ID = '058a381c641846c781e88d614741d13c';

const notion = new Client({ auth: NOTION_TOKEN });

type NotionProperty = Record<string, any>;

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function normalizeId(id?: string): string | undefined {
  return id?.replace(/-/g, '');
}

type LogLevel = 'log' | 'warn' | 'error';
function log(level: LogLevel, event: string, payload: Record<string, unknown> = {}) {
  const entry = {
    ts: new Date().toISOString(),
    event,
    ...payload,
  };
  // eslint-disable-next-line no-console
  (console[level] || console.log)(`[notion-archive] ${event} ${JSON.stringify(entry)}`);
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

export async function GET() {
  return NextResponse.json({ ok: true, message: 'notion archive webhook ready' });
}

export async function POST(req: Request) {
  let pageId: string | undefined;
  try {
    const body = (await req.json().catch(() => ({}))) as { pageId?: string };
    const reqId = Math.random().toString(36).slice(2, 10);
    log('log', 'request_received', { reqId });
    pageId = body?.pageId;
    if (!pageId) {
      log('warn', 'validation_failed', { reqId, reason: 'missing_pageId' });
      return NextResponse.json({ ok: false, error: 'Missing pageId' }, { status: 400 });
    }

    // Retrieve page
    const page: any = await notion.pages.retrieve({ page_id: pageId } as any);
    log('log', 'page_retrieved', {
      pageId,
      archived: !!page?.archived,
      parentDbId: page?.parent?.database_id,
    });
    if (page.archived) {
      log('warn', 'skip_already_archived', { pageId });
      return NextResponse.json({ ok: true, skipped: true, reason: 'already archived' });
    }

    // Verify belongs to Requests DB (optional)
    const parentDbId: string | undefined = page.parent?.database_id;
    if (parentDbId && normalizeId(parentDbId) !== normalizeId(REQUEST_DB_ID)) {
      log('warn', 'db_mismatch', { pageId, parentDbId, expected: REQUEST_DB_ID });
      return NextResponse.json({ ok: false, error: 'Not a Requests DB item' }, { status: 400 });
    }

    const props = page.properties as NotionProperty;
    const isDone = !!getCheckbox(props['결재 완료']);
    if (!isDone) {
      log('warn', 'skip_not_completed', { pageId });
      return NextResponse.json({ ok: true, skipped: true, reason: '결재 완료 not checked' });
    }

    // Create archived copy
    const archiveProps = buildArchiveProps(props);
    log('log', 'archive_create_start', { pageId });
    const created = await notion.pages.create({
      parent: { database_id: ARCHIVE_DB_ID },
      properties: archiveProps,
    } as any);
    log('log', 'archive_create_success', { pageId, archiveId: created.id });

    // Archive original
    await notion.pages.update({ page_id: pageId, archived: true } as any);
    log('log', 'source_archived', { pageId });

    return NextResponse.json({ ok: true, archived: pageId, copiedTo: created.id });
  } catch (err: any) {
    const errorId = Math.random().toString(36).slice(2, 10);
    log('error', 'unhandled_error', { errorId, pageId, error: err?.message });
    return NextResponse.json(
      { ok: false, errorId, error: err?.message || 'Unknown error' },
      { status: 500 },
    );
  }
}
