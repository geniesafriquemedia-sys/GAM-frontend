/**
 * Hook - Réseaux sociaux du site
 */

import { useCallback } from 'react';
import { useFetch, type UseFetchOptions } from './use-fetch';
import { api } from '@/lib/api';
import type { SocialNetwork } from '@/types';

export function useSocialNetworks(options: UseFetchOptions = {}) {
  const fetchNetworks = useCallback(
    () => api.site.getSocialNetworks(),
    []
  );

  return useFetch<SocialNetwork[]>(fetchNetworks, [], options as UseFetchOptions<SocialNetwork[]>);
}
