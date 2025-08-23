interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
}

export function AuthCard({ children, className = '' }: AuthCardProps) {
  return (
    <div className={`rounded-lg bg-white p-6 shadow-md dark:bg-gray-800 ${className}`}>
      {children}
    </div>
  );
}
