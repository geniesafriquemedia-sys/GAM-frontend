export default function WebTVLoading() {
  return (
    <div className="container mx-auto px-4 py-16 animate-pulse">
      {/* Header */}
      <div className="space-y-6 mb-16">
        <div className="h-4 w-32 bg-muted rounded" />
        <div className="h-16 w-1/2 bg-muted rounded" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="space-y-4">
            <div className="aspect-video bg-muted rounded-2xl" />
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-3 bg-muted rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}