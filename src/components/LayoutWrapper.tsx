"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { TopAdBanner } from "./TopAdBanner";
import { SkipLink } from "./SkipLink";
import ErrorReporter from "./ErrorReporter";

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
      <SkipLink />
      <ErrorReporter />
      <TopAdBanner />
      <Header />
      <main id="main-content" role="main" className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}
