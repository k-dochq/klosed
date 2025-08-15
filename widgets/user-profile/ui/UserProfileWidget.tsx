'use client';

import { useUser, UserAvatar } from 'entities/user';
import { SignOutButton } from 'features/google-auth';
import Link from 'next/link';

export function UserProfileWidget() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className='flex items-center gap-3'>
        <div className='h-10 w-10 animate-pulse rounded-full bg-gray-200'></div>
        <div className='h-4 w-20 animate-pulse rounded bg-gray-200'></div>
      </div>
    );
  }

  if (!user) {
    return (
      <Link
        href='/auth/login'
        className='rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
      >
        로그인
      </Link>
    );
  }

  return (
    <div className='flex items-center gap-3'>
      <UserAvatar src={user.avatarUrl} alt={user.fullName || user.email || 'User'} />
      <div className='flex flex-col'>
        <span className='text-sm font-medium text-gray-900'>{user.fullName || user.email}</span>
        {user.provider && <span className='text-xs text-gray-500'>{user.provider} 계정</span>}
      </div>
      <SignOutButton />
    </div>
  );
}
