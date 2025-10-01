"use client";

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils/cn';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill';
  fallback?: string;
}

export default function OptimizedImage({
  src,
  alt,
  width = 600,
  height = 400,
  className,
  priority = false,
  fill = false,
  objectFit = 'cover',
  fallback = '/images/placeholder.png'
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {isLoading && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}

      <Image
        src={hasError ? fallback : src}
        alt={alt}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        fill={fill}
        style={{ objectFit }}
        priority={priority}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100'
        )}
      />
    </div>
  );
}