import { Skeleton } from './Skeleton';

export function ProjectCardSkeleton() {
  return (
    <div className="group relative rounded-xl border bg-card p-6 shadow-sm">
      {/* Status badge skeleton */}
      <div className="absolute top-4 right-4">
        <Skeleton width={60} height={22} className="rounded-full" />
      </div>

      {/* Category skeleton */}
      <Skeleton width={80} height={20} className="mb-3" />

      {/* Title skeleton */}
      <Skeleton width="75%" height={28} className="mb-2" />

      {/* Description skeleton */}
      <div className="space-y-2 mb-4">
        <Skeleton width="100%" height={16} />
        <Skeleton width="90%" height={16} />
        <Skeleton width="60%" height={16} />
      </div>

      {/* Tech stack skeleton */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Skeleton width={60} height={24} className="rounded-full" />
        <Skeleton width={80} height={24} className="rounded-full" />
        <Skeleton width={70} height={24} className="rounded-full" />
      </div>

      {/* Footer skeleton */}
      <div className="flex items-center justify-between">
        <Skeleton width={100} height={16} />
        <Skeleton width={40} height={16} />
      </div>
    </div>
  );
}

// Grid skeleton
export function ProjectGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProjectCardSkeleton key={i} />
      ))}
    </div>
  );
}