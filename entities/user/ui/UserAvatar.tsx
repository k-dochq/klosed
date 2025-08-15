interface UserAvatarProps {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
}

export function UserAvatar({ src, alt, size = 'md' }: UserAvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  const fallbackClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-lg',
  };

  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={alt} className={`${sizeClasses[size]} rounded-full object-cover`} />
    );
  }

  // Show first letter of name as fallback
  const firstLetter = alt.charAt(0).toUpperCase();

  return (
    <div
      className={`${sizeClasses[size]} ${fallbackClasses[size]} flex items-center justify-center rounded-full bg-gray-300 font-medium text-gray-600`}
    >
      {firstLetter}
    </div>
  );
}
