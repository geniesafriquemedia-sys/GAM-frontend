import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connexion | GAM",
  description: "Connectez-vous à l'espace administration de GAM",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}
