import { GoogleSignInButton } from 'features/google-auth';
import { FacebookSignInButton } from 'features/facebook-auth';
import { LineSignInButton } from 'features/line-auth';

interface SocialLoginSectionProps {
  title: string;
}

export function SocialLoginSection({ title }: SocialLoginSectionProps) {
  return (
    <div className='space-y-4'>
      <h3 className='text-center text-lg font-medium text-gray-900 dark:text-white'>{title}</h3>
      <div className='space-y-3'>
        <LineSignInButton />
        <GoogleSignInButton />
        <FacebookSignInButton />
      </div>
    </div>
  );
}
