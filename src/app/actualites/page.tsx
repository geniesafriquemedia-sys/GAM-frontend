import { api } from "@/lib/api";
import { ActualitesList } from "@/components/ActualitesList";

// ISR - Régénération toutes les 5 minutes
export const revalidate = 300;

export const metadata = {
  title: "Actualités | GAM - Génies D'Afrique Media",
  description: "Toute l'actualité de GAM. Décryptage, analyses et reportages exclusifs sur les transformations du continent africain.",
};

export default async function ActualitesPage() {
  // Fetch initial data on server (parallel)
  const [articlesData, categoriesData] = await Promise.all([
    api.articles.getAllServer({
      page_size: 12,
      ordering: '-published_at'
    }),
    api.categories.getAllServer()
  ]);

  return (
    <ActualitesList
      initialArticles={articlesData}
      initialCategories={categoriesData}
    />
  );
}
