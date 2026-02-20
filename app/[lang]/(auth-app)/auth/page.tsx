import { AUTH_CONFIG } from '@/shared/config';
import { redirect } from 'next/navigation';

export default function AuthPage() {
  redirect(AUTH_CONFIG.authPath);
}
