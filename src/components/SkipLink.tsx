/**
 * Skip Link - Améliore l'accessibilité en permettant de sauter la navigation
 * Conforme WCAG 2.1 Level A (2.4.1 Bypass Blocks)
 */

import Link from "next/link";

export function SkipLink() {
  return (
    <Link
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:font-bold focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
    >
      Aller au contenu principal
    </Link>
  );
}
