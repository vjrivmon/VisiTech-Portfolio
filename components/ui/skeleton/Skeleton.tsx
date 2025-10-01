import { cn } from '@/lib/utils/cn';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  animate?: boolean;
}

export function Skeleton({
  className,
  variant = 'rectangular',
  width,
  height,
  animate = true
}: SkeletonProps) {
  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-md'
  };

  return (
    <div
      className={cn(
        'bg-muted',
        animate && 'animate-pulse',
        variantClasses[variant],
        className
      )}
      style={{
        width: width || '100%',
        height: height || '1rem'
      }}
    />
  );
}