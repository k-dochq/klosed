export type NotionProperty = Record<string, any>;

export type ProcessResult =
  | { ok: true; archived: string; copiedTo: string }
  | { ok: true; skipped: true; reason: string }
  | { ok: false; error: string };

export type ScanResult = {
  ok: true;
  mode: 'scan';
  processed: number;
  results: Array<{
    id: string;
    status: ProcessResult | { ok: false; errorId?: string; error?: string };
  }>;
};
