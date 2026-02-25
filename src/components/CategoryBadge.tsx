"use client";

import Link from "next/link";
import type { Category } from "@/types";

function getContrastColor(hex: string): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#000000" : "#FFFFFF";
}

export function CategoryBadge({ category }: { category: Category }) {
  const textColor = category.color ? getContrastColor(category.color) : "#ffffff";

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-black transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      style={{
        backgroundColor: category.color ? `${category.color}18` : "hsl(var(--primary)/0.1)",
        color: category.color || "hsl(var(--primary))",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: category.color ? `${category.color}40` : "hsl(var(--primary)/0.2)",
      }}
      onMouseEnter={(e) => {
        if (category.color) {
          (e.currentTarget as HTMLAnchorElement).style.backgroundColor = category.color;
          (e.currentTarget as HTMLAnchorElement).style.color = textColor;
        }
      }}
      onMouseLeave={(e) => {
        if (category.color) {
          (e.currentTarget as HTMLAnchorElement).style.backgroundColor = `${category.color}18`;
          (e.currentTarget as HTMLAnchorElement).style.color = category.color;
        }
      }}
    >
      <span className="uppercase tracking-[0.15em] text-[10px]">{category.name}</span>
      {category.articles_count > 0 && (
        <span className="text-[9px] font-black opacity-60 tabular-nums">
          {category.articles_count}
        </span>
      )}
    </Link>
  );
}
