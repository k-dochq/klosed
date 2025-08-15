// Simple IoC container for dependency injection
// Following Clean Architecture pattern without external DI libraries

import { createLogger } from '@/shared/lib/logger';

// Infrastructure layer imports
import { NotionClientService, LoggerService, createNotionClient } from './infrastructure/services';
import { NotionPageRepository } from './infrastructure/repositories';

// Application layer imports
import { ArchivePageUseCase, ProcessWebhookUseCase, ScanAndArchiveUseCase } from './use-cases';

// Configuration
const NOTION_TOKEN = process.env.NOTION_TOKEN || '';
const REQUEST_DB_ID = '5d8b167c-ceba-424a-bd68-94363fc79e1c';
const ARCHIVE_DB_ID = '058a381c-6418-46c7-81e8-8d614741d13c';

// Infrastructure instances
const notionClient = createNotionClient(NOTION_TOKEN);
const logger = createLogger('notion-approval-archive');

// Services
const notionClientService = new NotionClientService(notionClient);
const loggerService = new LoggerService(logger);

// Repositories
const notionPageRepository = new NotionPageRepository(notionClientService, ARCHIVE_DB_ID);

// Use Cases
const archivePageUseCase = new ArchivePageUseCase(notionPageRepository, loggerService);

const processWebhookUseCase = new ProcessWebhookUseCase(archivePageUseCase, loggerService);

const scanAndArchiveUseCase = new ScanAndArchiveUseCase(
  notionPageRepository,
  archivePageUseCase,
  loggerService,
);

// Container - simple object-based DI
export const container = {
  // Use Cases
  archivePageUseCase,
  processWebhookUseCase,
  scanAndArchiveUseCase,

  // Services
  loggerService,

  // Configuration
  config: {
    requestDbId: REQUEST_DB_ID,
    archiveDbId: ARCHIVE_DB_ID,
  },
} as const;
