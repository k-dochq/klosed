import { NextResponse } from 'next/server';
import { createLogger } from '@/shared/lib/logger';
import { createNotionClient } from './_lib/notionClient';
import { NotionArchiveService } from './_lib/NotionArchiveService';

// Hardcoded credentials and database IDs per user's request
const NOTION_TOKEN = process.env.NOTION_TOKEN || '';
// Requests DB (발급대장 - 증명서 발급)
const REQUEST_DB_ID = '5d8b167cceba424abd6894363fc79e1c';
// Archive DB (발급대장 - 보관)
const ARCHIVE_DB_ID = '058a381c641846c781e88d614741d13c';

const logger = createLogger('notion-archive');
const service = new NotionArchiveService(
  createNotionClient(NOTION_TOKEN),
  logger,
  REQUEST_DB_ID,
  ARCHIVE_DB_ID,
);

// route는 서비스만 호출

export async function GET() {
  return NextResponse.json({ ok: true, message: 'notion archive webhook ready' });
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as { dbId?: string };
    const reqId = Math.random().toString(36).slice(2, 10);
    const dbId = (body?.dbId || REQUEST_DB_ID) as string;
    logger.log('request_received', { reqId, mode: 'scan', dbId });
    logger.log('scan_start', { reqId, dbId });
    const res = await service.scanAndProcess(dbId);
    logger.log('scan_done', { reqId, processed: res.processed });
    return NextResponse.json(res);
  } catch (err: any) {
    const errorId = Math.random().toString(36).slice(2, 10);
    logger.error('unhandled_error', { errorId, error: err?.message });
    return NextResponse.json(
      { ok: false, errorId, error: err?.message || 'Unknown error' },
      { status: 500 },
    );
  }
}
