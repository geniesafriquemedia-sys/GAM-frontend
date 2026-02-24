/**
 * Types publicitaires GAM
 */

export type AdPosition =
  | 'HOMEPAGE_TOP'
  | 'HOMEPAGE_MID'
  | 'ARTICLE_SIDEBAR'
  | 'ARTICLE_IN_BODY_1'
  | 'ARTICLE_IN_BODY_2'
  | 'CATEGORIES_TOP'
  | 'WEBTV_TOP'
  | 'FOOTER_BANNER';

export type AdType =
  | 'LEADERBOARD'
  | 'BANNER'
  | 'SIDEBAR'
  | 'NATIVE'
  | 'IN_ARTICLE'
  | 'INTERSTITIEL';

export interface Advertisement {
  id: number;
  image_url?: string;
  image?: string | { url?: string } | null;
  external_url: string;
  alt_text: string;
  ad_type: AdType;
  position: AdPosition;
}
