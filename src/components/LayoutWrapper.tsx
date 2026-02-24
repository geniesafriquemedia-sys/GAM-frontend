"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { TopAdBanner } from "./TopAdBanner";

// Pages sans Header/Footer
const PAGES_WITHOUT_LAYOUT = ["/login"];

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideLayout = PAGES_WITHOUT_LAYOUT.includes(pathname);

  if (hideLayout) {
    return <>{children}</>;
  }

  return (
    <>
      <TopAdBanner />
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
