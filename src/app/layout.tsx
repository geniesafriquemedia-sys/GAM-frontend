import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { LayoutWrapper } from "@/components/LayoutWrapper";
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
    default: "GAM – Génies D'Afrique Media",
    template: "%s | GAM",
  },
  description: "Média panafricain dédié à l'innovation, la culture et l'actualité en Afrique. Découvrez nos articles, reportages et émissions Web TV.",
  keywords: ["Afrique", "médias", "actualités", "innovation", "culture", "économie", "technologie", "web tv", "panafricain"],
  authors: [{ name: "Génies D'Afrique Media" }],
  creator: "Génies D'Afrique Media",
  publisher: "Génies D'Afrique Media",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: "GAM - Génies D'Afrique Media",
    title: "GAM – Génies D'Afrique Media",
    description: "Média panafricain dédié à l'innovation, la culture et l'actualité en Afrique.",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "GAM - Génies D'Afrique Media",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GAM – Génies D'Afrique Media",
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
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
