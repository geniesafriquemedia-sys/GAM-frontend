/**
 * Loading UI pour la page À Propos
 */

import { Skeleton } from "@/components/ui/skeleton";

export default function AboutLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-16 text-center">
        <Skeleton className="h-16 w-96 mx-auto mb-6" />
        <Skeleton className="h-6 w-full max-w-3xl mx-auto mb-3" />
        <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="text-center space-y-2">
            <Skeleton className="h-12 w-24 mx-auto" />
            <Skeleton className="h-4 w-32 mx-auto" />
          </div>
        ))}
      </div>

      {/* Content sections */}
      <div className="space-y-12">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ))}
      </div>
    </div>
  );
}
