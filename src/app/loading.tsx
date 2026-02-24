import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-8 animate-in fade-in duration-500">
        {/* Logo avec animation pulse élégante */}
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse" />
          <Image
            src="/images/logo.png"
            alt="GAM - Génies d'Afrique Media"
            width={400}
            height={133}
            className="h-24 sm:h-32 md:h-40 w-auto object-contain relative z-10 animate-pulse"
            priority
          />
        </div>

        {/* Spinner élégant */}
        <div className="flex gap-2">
          <div className="h-3 w-3 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
          <div className="h-3 w-3 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
          <div className="h-3 w-3 rounded-full bg-primary animate-bounce" />
        </div>

        {/* Texte de chargement */}
        <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground animate-pulse">
          Chargement...
        </p>
      </div>
    </div>
  );
}
