export default function ArticleLoading() {
  return (
    <div className="animate-pulse">
      {/* Hero */}
      <section className="container mx-auto px-4 pt-12 md:pt-24">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="flex gap-2">
            <div className="h-3 w-16 bg-muted rounded" />
            <div className="h-3 w-24 bg-muted rounded" />
          </div>
          <div className="h-6 w-32 bg-muted rounded-full" />
          <div className="space-y-4">
            <div className="h-16 bg-muted rounded w-full" />
            <div className="h-16 bg-muted rounded w-3/4" />
          </div>
          <div className="h-8 bg-muted rounded w-2/3" />
          <div className="flex gap-8 py-8 border-y">
            <div className="flex gap-4">
              <div className="h-20 w-20 bg-muted rounded-3xl" />
              <div className="space-y-2">
                <div className="h-3 w-16 bg-muted rounded" />
                <div className="h-5 w-32 bg-muted rounded" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image */}
      <section className="container mx-auto px-4 mt-16">
        <div className="aspect-[21/9] bg-muted rounded-[4rem] max-w-7xl mx-auto" />
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 pt-16">
        <div className="max-w-4xl mx-auto space-y-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-4 bg-muted rounded w-full" />
          ))}
          <div className="h-4 bg-muted rounded w-3/4" />
        </div>
      </section>
    </div>
  );
}
