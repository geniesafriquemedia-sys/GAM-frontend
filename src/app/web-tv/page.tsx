import { api } from "@/lib/api";
import { WebTvList } from "@/components/WebTvList";

// ISR - Régénération toutes les 5 minutes
export const revalidate = 300;

export const metadata = {
  title: "Web TV | GAM - Génies Afrique Médias",
  description: "Découvrez nos reportages, documentaires et émissions exclusives sur les transformations du continent africain.",
};

export default async function WebTVPage() {
  // Fetch initial data on server (parallel)
  const [videosData, featuredRes] = await Promise.all([
    // First page of catalogue
    api.videos.getAllServer({
      page_size: 12,
      ordering: '-published_at',
      is_live: false,
    }),
    // Featured video for Hero
    api.videos.getAllServer({
      is_featured: true,
      is_live: false,
      page_size: 1,
    })
  ]);

  const featuredVideo = featuredRes.results[0] || null;

  return (
    <WebTvList
      initialVideos={videosData}
      featuredVideo={featuredVideo}
    />
  );
}
