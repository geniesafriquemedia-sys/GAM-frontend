import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { LayoutWrapper } from "@/components/LayoutWrapper";
import { Toaster } from "sonner";
import Script from "next/script";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";
import { PWARegister } from "@/components/PWARegister";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://gam.africa';

// Configuration du viewport pour la PWA
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
};

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
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'GAM',
  },
  applicationName: 'GAM - Génies D\'Afrique Media',
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/icons/icon-72x72.png', sizes: '72x72', type: 'image/png' },
      { url: '/icons/icon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/icons/icon-128x128.png', sizes: '128x128', type: 'image/png' },
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/icon-152x152.png', sizes: '152x152', type: 'image/png' },
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        {/* PWA Meta Tags */}
        <meta name="application-name" content="GAM" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="GAM" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="192x192" href="/icons/icon-192x192.png" />
        
        {/* Splash Screens pour iOS */}
        <link rel="apple-touch-startup-image" href="/images/geneis.png" />
      </head>
      <body
        className={`${spaceGrotesk.variable} font-sans antialiased bg-background text-foreground`}
      >
        <Script
          id="orchids-browser-logs"
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
          strategy="afterInteractive"
          data-orchids-project-id="79e8ea26-6a0e-44db-a3d8-0caba34fa0c5"
        />
        <PWARegister />
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
        <PWAInstallPrompt />
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
