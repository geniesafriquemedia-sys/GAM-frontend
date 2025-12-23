/**
 * Types Authentification
 * JWT, User, Login, Register
 */

// =============================================================================
// USER
// =============================================================================

export type UserRole = 'reader' | 'author' | 'editor' | 'admin';

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  avatar: string | null;
  bio: string;
  is_active: boolean;
  date_joined: string;
}

export interface UserProfile extends User {
  full_name: string;
}

// =============================================================================
// TOKENS JWT
// =============================================================================

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface DecodedToken {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: number;
}

// =============================================================================
// LOGIN
// =============================================================================

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse extends AuthTokens {
  user: User;
}

// =============================================================================
// REGISTER
// =============================================================================

export interface RegisterRequest {
  email: string;
  password: string;
  password_confirm: string;
  first_name?: string;
  last_name?: string;
}

export interface RegisterResponse {
  user: User;
  message: string;
}

// =============================================================================
// REFRESH TOKEN
// =============================================================================

export interface RefreshRequest {
  refresh: string;
}

export interface RefreshResponse {
  access: string;
  refresh?: string; // Si rotation activée
}

// =============================================================================
// PASSWORD
// =============================================================================

export interface ChangePasswordRequest {
  old_password: string;
  new_password: string;
  new_password_confirm: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface ResetPasswordConfirmRequest {
  token: string;
  password: string;
  password_confirm: string;
}

// =============================================================================
// AUTH STATE
// =============================================================================

export interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
