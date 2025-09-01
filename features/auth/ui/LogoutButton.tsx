'use client';

import { useState } from 'react';
import { createClient } from 'shared/lib/supabase';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { Button } from 'shared/ui/button';

interface LogoutButtonProps {
  dict: {
    logout?: string;
    loggingOut?: string;
  };
  locale: string;
}

export function LogoutButton({ dict, locale }: LogoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useLocalizedRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('Logout error:', error);
        return;
      }

      // 로그아웃 후 홈페이지로 리다이렉트 (locale 포함)
      window.location.href = `/${locale}`;
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleLogout} disabled={isLoading} variant='destructive' className='w-full'>
      {isLoading ? dict.loggingOut || 'Logging out...' : dict.logout || 'Logout'}
    </Button>
  );
}
