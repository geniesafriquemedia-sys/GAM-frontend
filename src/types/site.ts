/**
 * Types pour les paramètres du site (réseaux sociaux, config globale)
 */

export type SocialNetworkId =
  | 'facebook'
  | 'linkedin'
  | 'whatsapp'
  | 'tiktok'
  | 'youtube'
  | 'instagram'
  | 'twitter'
  | 'telegram'
  | 'snapchat'
  | 'other';

export interface SocialNetwork {
  id: number;
  network: SocialNetworkId;
  display_label: string;
  url: string;
  order: number;
}
