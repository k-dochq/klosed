import 'server-only';

// Server-only exports to avoid client-side imports
export { createClient as createServerClient } from './server';
export { updateSession } from './middleware';
