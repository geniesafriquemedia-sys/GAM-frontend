"use client";

import { ArticleForm } from "@/components/admin/forms/ArticleForm";

export default function EditArticlePage() {
  // En production, nous récupérerions les données avec l'ID
  const mockData = {
    id: "ART-2023-001",
    title: "L'émergence des Smart Cities en Afrique : L'exemple de Kigali",
    content: "Kigali s'impose comme un modèle de développement urbain technologique sur le continent. Entre innovation numérique et durabilité, retour sur une transformation exemplaire.\n\nLe Rwanda a fait de la technologie le pilier de sa croissance économique...",
    category: "Technologie",
    image: "https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?q=80&w=2000&auto=format&fit=crop",
    tags: ["Smart City", "Kigali", "Urbanisme"]
  };

  return <ArticleForm mode="edit" initialData={mockData} />;
}
