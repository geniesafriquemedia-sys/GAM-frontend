/**
 * Service Authentification
 * Login, Register, Logout, Token management
 */

import { apiClient, setAccessToken, clearAccessToken } from '../client';
import { ENDPOINTS } from '../config';
import type {
  User,
  AuthTokens,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  RefreshRequest,
  RefreshResponse,
} from '@/types';

// =============================================================================
// STORAGE KEYS
// =============================================================================

const STORAGE_KEYS = {
  ACCESS_TOKEN: 'gam_access_token',
  REFRESH_TOKEN: 'gam_refresh_token',
  USER: 'gam_user',
} as const;

// =============================================================================
// AUTH SERVICE
// =============================================================================

export const authService = {
  /**
   * Connexion utilisateur
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(
      ENDPOINTS.AUTH.LOGIN,
      credentials
    );

    // Stocker les tokens
    this.setTokens(response);
    this.setUser(response.user);

    return response;
  },

  /**
   * Inscription utilisateur
   */
  async register(data: RegisterRequest): Promise<RegisterResponse> {
    return apiClient.post<RegisterResponse>(ENDPOINTS.AUTH.REGISTER, data);
  },

  /**
   * Déconnexion
   */
  async logout(): Promise<void> {
    try {
      const refreshToken = this.getRefreshToken();
      if (refreshToken) {
        await apiClient.post(ENDPOINTS.AUTH.LOGOUT, { refresh: refreshToken });
      }
    } catch {
      // Ignorer les erreurs de logout
    } finally {
      this.clearAuth();
    }
  },

  /**
   * Rafraîchir le token d'accès
   */
  async refreshToken(): Promise<RefreshResponse | null> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) return null;

    try {
      const response = await apiClient.post<RefreshResponse>(
        ENDPOINTS.AUTH.REFRESH,
        { refresh: refreshToken } as RefreshRequest
      );

      // Mettre à jour le token d'accès
      setAccessToken(response.access);
      this.setStorageItem(STORAGE_KEYS.ACCESS_TOKEN, response.access);

      // Si rotation activée, mettre à jour le refresh token
      if (response.refresh) {
        this.setStorageItem(STORAGE_KEYS.REFRESH_TOKEN, response.refresh);
      }

      return response;
    } catch {
      this.clearAuth();
      return null;
    }
  },

  /**
   * Récupérer le profil utilisateur
   */
  async getProfile(): Promise<User> {
    return apiClient.get<User>(ENDPOINTS.AUTH.PROFILE);
  },

  /**
   * Mettre à jour le profil
   */
  async updateProfile(data: Partial<User>): Promise<User> {
    const user = await apiClient.patch<User>(ENDPOINTS.AUTH.PROFILE, data);
    this.setUser(user);
    return user;
  },

  // ===========================================================================
  // TOKEN MANAGEMENT
  // ===========================================================================

  /**
   * Stocker les tokens
   */
  setTokens(tokens: AuthTokens): void {
    setAccessToken(tokens.access);
    this.setStorageItem(STORAGE_KEYS.ACCESS_TOKEN, tokens.access);
    this.setStorageItem(STORAGE_KEYS.REFRESH_TOKEN, tokens.refresh);
  },

  /**
   * Récupérer le token d'accès
   */
  getAccessToken(): string | null {
    return this.getStorageItem(STORAGE_KEYS.ACCESS_TOKEN);
  },

  /**
   * Récupérer le refresh token
   */
  getRefreshToken(): string | null {
    return this.getStorageItem(STORAGE_KEYS.REFRESH_TOKEN);
  },

  // ===========================================================================
  // USER MANAGEMENT
  // ===========================================================================

  /**
   * Stocker l'utilisateur
   */
  setUser(user: User): void {
    this.setStorageItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  /**
   * Récupérer l'utilisateur stocké
   */
  getUser(): User | null {
    const userJson = this.getStorageItem(STORAGE_KEYS.USER);
    if (!userJson) return null;
    try {
      return JSON.parse(userJson);
    } catch {
      return null;
    }
  },

  // ===========================================================================
  // AUTH STATE
  // ===========================================================================

  /**
   * Vérifier si l'utilisateur est authentifié
   */
  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  },

  /**
   * Initialiser l'auth depuis le storage
   */
  initializeAuth(): void {
    const accessToken = this.getAccessToken();
    if (accessToken) {
      setAccessToken(accessToken);
    }
  },

  /**
   * Nettoyer l'authentification
   */
  clearAuth(): void {
    clearAccessToken();
    this.removeStorageItem(STORAGE_KEYS.ACCESS_TOKEN);
    this.removeStorageItem(STORAGE_KEYS.REFRESH_TOKEN);
    this.removeStorageItem(STORAGE_KEYS.USER);
  },

  // ===========================================================================
  // STORAGE HELPERS
  // ===========================================================================

  setStorageItem(key: string, value: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  },

  getStorageItem(key: string): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  },

  removeStorageItem(key: string): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  },
};
