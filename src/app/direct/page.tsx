import { api } from "@/lib/api";
import { DirectContent } from "@/components/DirectContent";

// ISR - Régénération toutes les 60 secondes pour le direct
export const revalidate = 60;

export const metadata = {
  title: "Direct | GAM - Génies Afrique Médias",
  description: "Suivez GAM en direct. Actualités, débats et reportages exclusifs en temps réel sur les transformations du continent africain.",
};

export default async function DirectPage() {
  // Fetch initial data on server (parallel)
  const [liveData, recentData] = await Promise.all([
    // Check for live stream
    api.videos.getAllServer({
      is_live: true,
      page_size: 1,
    }),
    // Fetch recent replays
    api.videos.getAllServer({
      page_size: 6,
      ordering: '-published_at',
      is_live: false,
    })
  ]);

  return (
    <DirectContent
      initialLiveVideo={liveData}
      initialRecentVideos={recentData}
    />
  );
}
