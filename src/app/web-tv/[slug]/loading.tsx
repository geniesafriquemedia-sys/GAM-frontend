export default function VideoLoading() {
  return (
    <div className="container mx-auto px-4 py-16 animate-pulse">
      {/* Video player */}
      <div className="max-w-5xl mx-auto">
        <div className="aspect-video bg-muted rounded-3xl mb-8" />
        <div className="space-y-4">
          <div className="h-8 bg-muted rounded w-3/4" />
          <div className="h-4 bg-muted rounded w-1/2" />
          <div className="flex gap-4 pt-4">
            <div className="h-10 w-24 bg-muted rounded-full" />
            <div className="h-10 w-24 bg-muted rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}