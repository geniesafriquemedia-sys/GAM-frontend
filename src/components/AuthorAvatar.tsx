"use client";

import Image from "next/image";
import { User } from "lucide-react";
import { getMediaUrl } from "@/lib/api/config";
import { cn } from "@/lib/utils";

interface AuthorAvatarProps {
  photo?: string | null;
  name: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  /** Style variant for the container shape */
  variant?: "circle" | "rounded";
}

const sizeMap = {
  xs: { container: "h-5 w-5", image: 20, icon: "h-3 w-3" },
  sm: { container: "h-7 w-7", image: 28, icon: "h-4 w-4" },
  md: { container: "h-10 w-10", image: 40, icon: "h-5 w-5" },
  lg: { container: "h-20 w-20", image: 80, icon: "h-8 w-8" },
  xl: { container: "h-32 w-32 md:h-40 md:w-40", image: 160, icon: "h-16 w-16" },
};

/**
 * Composant uniforme pour afficher l'avatar d'un auteur.
 *
 * - Si l'auteur a une photo (URL Cloudinary ou relative), elle est affichée via next/image
 *   après normalisation via getMediaUrl().
 * - Si aucune photo n'est disponible (null, vide, ou URL invalide), une icône <User>
 *   uniforme est affichée à la place. Pas de fallback vers une lettre ou une image manquante.
 */
export function AuthorAvatar({
  photo,
  name,
  size = "md",
  className,
  variant = "circle",
}: AuthorAvatarProps) {
  const { container, image, icon } = sizeMap[size];
  const shapeClass = variant === "rounded" ? "rounded-3xl" : "rounded-full";

  // Normalise l'URL : Cloudinary, absolue, ou relative → toujours une URL complète
  const photoUrl = photo ? getMediaUrl(photo) : null;
  // Considère la photo valide seulement si l'URL est non vide après normalisation
  const hasPhoto = !!photoUrl;

  return (
    <div
      className={cn(
        container,
        shapeClass,
        "overflow-hidden flex-shrink-0 bg-primary/10 flex items-center justify-center",
        className
      )}
    >
      {hasPhoto ? (
        <Image
          src={photoUrl}
          alt={name}
          width={image}
          height={image}
          className="object-cover w-full h-full"
        />
      ) : (
        <User className={cn(icon, "text-primary/50")} />
      )}
    </div>
  );
}
