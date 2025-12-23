/**
 * Types Catégorie
 * Organisation des contenus par thématiques
 */

// =============================================================================
// CATEGORY
// =============================================================================

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  color: string;           // Code hex: "#3B82F6"
  icon: string;            // Nom icône: "globe", "briefcase", "cpu"
  image: string | null;
  parent: number | null;
  is_active: boolean;
  is_featured: boolean;
  articles_count: number;
  videos_count: number;
  total_content_count: number;
  order: number;
  created_at: string;
  updated_at: string;
}

// Version allégée pour les listes et relations
export interface CategorySummary {
  id: number;
  name: string;
  slug: string;
  color: string;
  icon: string;
}

// Catégorie avec sous-catégories
export interface CategoryWithChildren extends Category {
  children: Category[];
}

// =============================================================================
// QUERY PARAMS
// =============================================================================

export interface CategoryQueryParams {
  [key: string]: string | number | boolean | undefined | null;
  page?: number;
  page_size?: number;
  is_active?: boolean;
  is_featured?: boolean;
  parent?: number | null;  // null = catégories racines
  search?: string;
  ordering?: string;       // 'name', 'order', '-articles_count'
}

// =============================================================================
// HELPERS
// =============================================================================

export function getCategoryUrl(category: Category | CategorySummary): string {
  return `/categories/${category.slug}`;
}

export function getCategoryStyle(category: Category | CategorySummary): React.CSSProperties {
  return {
    backgroundColor: category.color,
    color: getContrastColor(category.color),
  };
}

export function getCategoryBadgeClass(category: Category | CategorySummary): string {
  return `bg-[${category.color}] text-white`;
}

// Calcule la couleur de texte contrastée (blanc ou noir)
function getContrastColor(hexColor: string): string {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
}

// =============================================================================
// ICONS MAPPING
// =============================================================================

export const CATEGORY_ICONS: Record<string, string> = {
  globe: 'Globe',
  briefcase: 'Briefcase',
  cpu: 'Cpu',
  book: 'BookOpen',
  film: 'Film',
  music: 'Music',
  camera: 'Camera',
  heart: 'Heart',
  star: 'Star',
  zap: 'Zap',
  users: 'Users',
  trending: 'TrendingUp',
};
