export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-16 animate-pulse">
      {/* Hero skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-8">
          <div className="aspect-[16/9] bg-muted rounded-3xl" />
          <div className="space-y-4">
            <div className="h-8 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-1/2" />
          </div>
          <div className="grid grid-cols-2 gap-8 pt-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-4">
                <div className="aspect-[16/11] bg-muted rounded-2xl" />
                <div className="h-4 bg-muted rounded w-full" />
                <div className="h-3 bg-muted rounded w-2/3" />
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-4">
          <div className="h-[600px] bg-muted rounded-3xl" />
        </div>
      </div>
    </div>
  );
}
