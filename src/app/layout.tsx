import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toaster } from "sonner";
import Script from "next/script";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://gam.africa';

// Métadonnées globales avec OpenGraph (US-09, US-11)
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "GAM – Geniesdafriquemedia",
    template: "%s | GAM",
  },
  description: "Média panafricain dédié à l'innovation, la culture et l'actualité en Afrique. Découvrez nos articles, reportages et émissions Web TV.",
  keywords: ["Afrique", "médias", "actualités", "innovation", "culture", "économie", "technologie", "web tv", "panafricain"],
  authors: [{ name: "Geniesdafriquemedia" }],
  creator: "Geniesdafriquemedia",
  publisher: "Geniesdafriquemedia",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: "GAM - Geniesdafriquemedia",
    title: "GAM – Geniesdafriquemedia",
    description: "Média panafricain dédié à l'innovation, la culture et l'actualité en Afrique.",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "GAM - Geniesdafriquemedia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GAM – Geniesdafriquemedia",
    description: "Média panafricain dédié à l'innovation, la culture et l'actualité en Afrique.",
    images: [`${SITE_URL}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} font-sans antialiased bg-background text-foreground`}
      >
        <Script
          id="orchids-browser-logs"
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
          strategy="afterInteractive"
          data-orchids-project-id="79e8ea26-6a0e-44db-a3d8-0caba34fa0c5"
        />
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
