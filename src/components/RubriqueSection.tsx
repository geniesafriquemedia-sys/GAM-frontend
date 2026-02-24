"use client";

import { CategorySection } from "@/components/CategorySection";
import { Advertisement } from "@/components/Advertisement";
import type { Category, ArticleSummary } from "@/types";
import type { Advertisement as Ad } from "@/types/advertising";

export interface CategoryWithArticles {
  category: Category;
  articles: ArticleSummary[];
}

interface RubriqueSectionProps {
  categoriesWithArticles: CategoryWithArticles[];
  /** Pubs HOMEPAGE_MID pré-chargées côté serveur */
  midAds?: Ad[];
}

export function RubriqueSection({ categoriesWithArticles, midAds }: RubriqueSectionProps) {
  const active = categoriesWithArticles.filter((c) => c.articles.length > 0);

  if (active.length === 0) return null;

  return (
    <div className="space-y-16">
      {active.map((item, index) => (
        <div key={item.category.id}>
          <CategorySection
            category={item.category}
            articles={item.articles}
          />

          {/* Pub intercalée après la 2ème section */}
          {index === 1 && (
            <div className="mt-12 flex justify-center">
              <Advertisement
                position="HOMEPAGE_MID"
                initialAds={midAds}
                className="py-4"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default RubriqueSection;
