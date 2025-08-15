import { NextResponse } from 'next/server';
import { container } from './container';
import { ArchivePageRequest, ScanRequest, InvalidArchiveRequestError } from './entities';

// Type guards for request validation
function isNotionWebhook(body: unknown): body is {
  object: 'event';
  page_id: string;
  property_name: string;
  type: 'page_property_updated';
} {
  if (typeof body !== 'object' || body === null) return false;
  const webhook = body as Record<string, unknown>;
  return (
    webhook.object === 'event' &&
    typeof webhook.page_id === 'string' &&
    typeof webhook.property_name === 'string' &&
    webhook.type === 'page_property_updated'
  );
}

function isDirectWebhookRequest(body: unknown): body is {
  pageId: string;
  propertyName?: string;
} {
  if (typeof body !== 'object' || body === null) return false;
  const request = body as Record<string, unknown>;
  return typeof request.pageId === 'string';
}

function isScanRequest(body: unknown): body is {
  mode?: 'scan';
  dbId?: string;
} {
  if (typeof body !== 'object' || body === null) return false;
  const request = body as Record<string, unknown>;
  return !('pageId' in request) && (request.mode === 'scan' || 'dbId' in request);
}

// Controller functions
export async function GET() {
  return NextResponse.json({
    ok: true,
    message: 'Notion Approval Archive API ready',
    version: '2.0.0-clean-architecture',
    endpoint: '/api/notion/approval/archive',
  });
}

export async function POST(req: Request) {
  // Extract or generate request ID for tracing
  const requestId = req.headers.get('x-request-id') || crypto.randomUUID().slice(0, 8);

  try {
    // 1. Parse and validate input
    const body = await req.json().catch(() => ({}));

    container.loggerService.log('request_received', {
      requestId,
      body: JSON.stringify(body),
    });

    // 2. Route to appropriate use case based on request type

    // Handle Notion webhook
    if (isNotionWebhook(body)) {
      container.loggerService.log('webhook_notion_received', {
        requestId,
        pageId: body.page_id,
        property: body.property_name,
      });

      // Skip irrelevant property changes
      if (body.property_name !== '결재 완료') {
        container.loggerService.log('webhook_property_skipped', {
          requestId,
          pageId: body.page_id,
          property: body.property_name,
        });

        return NextResponse.json({
          success: true,
          message: `Property ${body.property_name} not relevant for archiving`,
          skipped: true,
        });
      }

      const archiveRequest = ArchivePageRequest.fromWebhook(body);
      const result = await container.processWebhookUseCase.execute(archiveRequest);

      container.loggerService.log('webhook_notion_complete', { requestId, result });
      return NextResponse.json(
        { ...result, requestId },
        { headers: { 'x-request-id': requestId } },
      );
    }

    // Handle direct webhook processing request
    if (isDirectWebhookRequest(body)) {
      container.loggerService.log('webhook_direct_received', {
        requestId,
        pageId: body.pageId,
      });

      const archiveRequest = ArchivePageRequest.fromDirect(body);
      const result = await container.processWebhookUseCase.execute(archiveRequest);

      container.loggerService.log('webhook_direct_complete', { requestId, result });
      return NextResponse.json(
        { ...result, requestId },
        { headers: { 'x-request-id': requestId } },
      );
    }

    // Handle scan request
    if (isScanRequest(body)) {
      const dbId = body.dbId || container.config.requestDbId;
      container.loggerService.log('scan_request_received', {
        requestId,
        databaseId: dbId,
      });

      const scanRequest = ScanRequest.create(dbId);
      const result = await container.scanAndArchiveUseCase.execute(scanRequest);

      container.loggerService.log('scan_request_complete', {
        requestId,
        processed: result.processed,
      });

      return NextResponse.json(
        { ...result, requestId },
        { headers: { 'x-request-id': requestId } },
      );
    }

    // Default: perform scan on default database
    container.loggerService.log('default_scan_request', { requestId });

    const defaultScanRequest = ScanRequest.create();
    const result = await container.scanAndArchiveUseCase.execute(defaultScanRequest);

    container.loggerService.log('default_scan_complete', {
      requestId,
      processed: result.processed,
    });

    return NextResponse.json({ ...result, requestId }, { headers: { 'x-request-id': requestId } });
  } catch (error) {
    const errorId = Math.random().toString(36).slice(2, 10);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    container.loggerService.error('controller_error', {
      errorId,
      requestId,
      error: errorMessage,
    });

    // Handle domain errors with appropriate HTTP status
    if (error instanceof InvalidArchiveRequestError) {
      return NextResponse.json(
        {
          success: false,
          errorId,
          requestId,
          error: errorMessage,
          type: 'validation_error',
        },
        {
          status: 400,
          headers: { 'x-request-id': requestId },
        },
      );
    }

    // Handle all other errors as internal server errors
    return NextResponse.json(
      {
        success: false,
        errorId,
        requestId,
        error: errorMessage,
        type: 'internal_error',
      },
      {
        status: 500,
        headers: { 'x-request-id': requestId },
      },
    );
  }
}
