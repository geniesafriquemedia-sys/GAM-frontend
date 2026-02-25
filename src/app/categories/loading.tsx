/**
 * Loading UI pour la page Catégories
 */

import { Skeleton } from "@/components/ui/skeleton";

export default function CategoriesLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <Skeleton className="h-12 w-80 mb-4" />
        <Skeleton className="h-6 w-full max-w-2xl" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="p-6 border rounded-2xl space-y-3">
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ))}
      </div>
    </div>
  );
}
